<?php
/**
 * =====================================================
 * DATABASE CONNECTION HELPER
 * =====================================================
 * 
 * This file provides a secure PDO database connection.
 * Configuration is loaded from the config file stored
 * OUTSIDE public_html for security.
 * 
 * Location: /home/username/public_html/api/db.php
 */

// Prevent direct access to this file
if (basename($_SERVER['PHP_SELF']) === 'db.php') {
    http_response_code(403);
    exit('Direct access forbidden');
}

/**
 * Get database connection using PDO
 * 
 * @return PDO Database connection instance
 * @throws Exception If connection fails
 */
function getDbConnection(): PDO
{
    static $pdo = null;
    
    // Return existing connection if available (singleton pattern)
    if ($pdo !== null) {
        return $pdo;
    }
    
    // Load configuration from secure location (outside public_html)
    $configPath = dirname(__DIR__, 3) . '/config/env.php';
    
    if (!file_exists($configPath)) {
        error_log("PostersReady Error: Config file not found at: $configPath");
        throw new Exception('Server configuration error');
    }
    
    $config = require $configPath;
    $db = $config['db'];
    
    // Build DSN (Data Source Name)
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $db['host'],
        $db['name'],
        $db['charset'] ?? 'utf8mb4'
    );
    
    // PDO options for security and performance
    $options = [
        // Throw exceptions on errors (easier debugging)
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        
        // Return associative arrays by default
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        
        // Disable emulated prepared statements (more secure)
        PDO::ATTR_EMULATE_PREPARES   => false,
        
        // Use persistent connections for better performance
        PDO::ATTR_PERSISTENT         => true,
    ];
    
    try {
        $pdo = new PDO($dsn, $db['username'], $db['password'], $options);
        return $pdo;
    } catch (PDOException $e) {
        // Log the actual error but don't expose it to users
        error_log("PostersReady DB Error: " . $e->getMessage());
        throw new Exception('Database connection failed');
    }
}

/**
 * Get configuration value
 * 
 * @param string $key Optional key to get specific config section
 * @return array Configuration array
 */
function getConfig(string $key = null): array
{
    static $config = null;
    
    if ($config === null) {
        $configPath = dirname(__DIR__, 3) . '/config/env.php';
        
        if (!file_exists($configPath)) {
            throw new Exception('Server configuration error');
        }
        
        $config = require $configPath;
    }
    
    if ($key !== null) {
        return $config[$key] ?? [];
    }
    
    return $config;
}

/**
 * Send JSON response with proper headers
 * 
 * @param array $data Response data
 * @param int $statusCode HTTP status code
 */
function jsonResponse(array $data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Handle CORS headers
 * Allows cross-origin requests from allowed domains only
 */
function handleCors(): void
{
    $config = getConfig('app');
    $allowedOrigins = $config['allowed_origins'] ?? [];
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    // Check if origin is allowed
    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400'); // Cache preflight for 24 hours
    
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/**
 * Validate required fields in request data
 * 
 * @param array $data Input data
 * @param array $required Required field names
 * @return array|null Returns missing fields array or null if all present
 */
function validateRequired(array $data, array $required): ?array
{
    $missing = [];
    
    foreach ($required as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            $missing[] = $field;
        }
    }
    
    return count($missing) > 0 ? $missing : null;
}

/**
 * Sanitize string input
 * 
 * @param string $input Raw input
 * @return string Sanitized string
 */
function sanitizeString(string $input): string
{
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email format
 * 
 * @param string $email Email address
 * @return bool True if valid
 */
function isValidEmail(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Generate a unique reference ID
 * 
 * @param string $prefix Prefix for the ID
 * @return string Unique ID
 */
function generateReferenceId(string $prefix = 'PR'): string
{
    return $prefix . '_' . time() . '_' . bin2hex(random_bytes(4));
}

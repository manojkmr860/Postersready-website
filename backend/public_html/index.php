<?php
/**
 * =====================================================
 * MAIN ENTRY POINT
 * =====================================================
 * 
 * This file handles requests to the root of public_html.
 * It redirects to the React application or serves the
 * appropriate response.
 * 
 * Location: /home/username/public_html/index.php
 */

// If React build exists, serve it
$reactIndex = __DIR__ . '/react-build/index.html';

if (file_exists($reactIndex)) {
    // Serve React app
    include $reactIndex;
    exit;
}

// Otherwise, show a simple holding page
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PostersReady - AI-Powered Social Media Design</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #042F1A 0%, #065F46 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            opacity: 0.9;
            margin-bottom: 2rem;
        }
        .status {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem 2rem;
            border-radius: 10px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 PostersReady</h1>
        <p>AI-Powered Social Media Design Platform</p>
        <div class="status">
            🚀 Coming Soon
        </div>
    </div>
</body>
</html>

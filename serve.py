#!/usr/bin/env python3
"""
Lightweight Local HTTP Server for Harsh Bhardwaj's Portfolio
Starts a web server on http://localhost:8000 and serves the portfolio.
"""

import http.server
import socketserver
import os
import sys

DEFAULT_PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class PortfolioHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable cache during local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run_server():
    port = DEFAULT_PORT
    os.chdir(DIRECTORY)

    # Try ports in sequence if 8000 is occupied
    for attempt in range(10):
        current_port = port + attempt
        try:
            with socketserver.TCPServer(("", current_port), PortfolioHTTPRequestHandler) as httpd:
                print("=" * 60)
                print("🚀 Harsh Bhardwaj — Staff SWE Portfolio is LIVE!")
                print(f"👉 Local URL: http://localhost:{current_port}")
                print(f"📁 Serving Directory: {DIRECTORY}")
                print("⌨️  Press Ctrl+C to stop the server")
                print("=" * 60)
                httpd.serve_forever()
                return
        except OSError as e:
            if attempt == 9:
                print(f"❌ Error: Could not bind to port {current_port}: {e}", file=sys.stderr)
                sys.exit(1)
            continue

if __name__ == '__main__':
    run_server()

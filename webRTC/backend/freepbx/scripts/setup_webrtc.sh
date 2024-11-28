#!/bin/bash

# Reload FreePBX configuration
fwconsole reload

# Verify WebRTC status
fwconsole show webrtc

echo "WebRTC configuration applied successfully!"

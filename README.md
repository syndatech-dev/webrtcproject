 WebRTC SIP Client for Odoo with FreePBX Integration and Call Recording

 Overview

This project integrates a WebRTCbased SIP client with Odoo and FreePBX to enable SIP extension registration, call management, and call recording directly within Odoo. The system allows users to register any SIP extension, make and receive calls via WebRTC, and automatically record those calls within Odoo.

 Features

 SIP Registration with WebRTC: Register and manage SIP extensions in Odoo using FreePBX as the backend.
 Make and Receive Calls: Use WebRTC to place and receive SIP calls directly from your Odoo interface.
 Automatic Call Recording: Record both incoming and outgoing calls and store the recordings in Odoo.
 Link Recordings to Odoo Entities: Associate call recordings with Odoo users, customers, or leads.
 Call Metadata: Track call duration, call date, and the associated user or customer information.

 Prerequisites

Before you begin, ensure you have the following:

 FreePBX: A FreePBX instance with WebRTC and SIP extension support enabled.
 Odoo: A running Odoo instance (version 14+ recommended).
 JsSIP: The JsSIP library for SIP signaling over WebRTC.
 Web Server: Nginx or Apache for serving the recordings, or an alternative filesharing protocol (e.g., SFTP).
 Asterisk Server: FreePBX runs on Asterisk, which will handle call routing and recording.

 Setup Instructions

 Step 1: Configure FreePBX for SIP and WebRTC Support

 1.1 Set Up SIP Extensions in FreePBX

1. Log into FreePBX:
    Open the FreePBX web interface and log in.

2. Create a SIP Extension:
    Go to Applications > Extensions.
    Click on Add Extension.
    Select Generic SIP Device and click Submit.
    Fill out the extension details (e.g., Extension Number, Display Name, etc.).
    For Call Recording, select the recording options (e.g., Always, On Demand, etc.).

3. Enable WebRTC:
    Go to Settings > Asterisk SIP Settings.
    Under the General SIP Settings, ensure that Enable SIP for WebRTC is checked.
    Enable TLS (Transport Layer Security) to ensure secure communication.
    Ensure the WebRTC SSL Certificates are correctly configured for HTTPS support.
    Save settings.

 1.2 Enable Call Recording in FreePBX

1. Set Call Recording Options:
    Go to Applications > Extensions.
    Edit your SIP extension and enable call recording options.
    Set the recording format (e.g., `.wav` or `.mp3`).
    By default, FreePBX saves the recordings in the `/var/spool/asterisk/monitor/` directory.

2. Save and Apply Configurations:
    After configuring call recording for the extension, save and apply the changes.



 Step 2: Develop Odoo Module for WebRTC SIP Client

You need to create a custom Odoo module to integrate WebRTC and SIP functionality.

 2.1 Create a New Odoo Module

1. Set Up Your Odoo Development Environment:
    Install Odoo (if not already done) on your server and make sure you have access to the Odoo development environment.
    You can set up Odoo on your local machine or a cloudbased server (e.g., AWS, DigitalOcean).

2. Create the Odoo Module Directory:
    Navigate to the Odoo `addons` folder.
    Create a new folder for your module, e.g., `synda_webrtc_sip_client`.

3. Create the Necessary Files:
    `__manifest__.py`: This file will define the module’s metadata.

   ```python
   {
       'name': 'WebRTC SIP Client',
       'version': '1.0',
       'summary': 'WebRTC SIP Client for Odoo Integration with FreePBX',
       'author': 'Synda Tech',
       'depends': ['base'],
       'data': [
           'views/webrtc_sip_client_views.xml',
       ],
       'installable': True,
       'application': True,
   }
   ```

    `models/webrtc_sip_client.py`: Define any necessary models for managing SIP registrations and call recordings.

4. Install JsSIP for WebRTC:
    JsSIP is a JavaScript library that will handle SIP signaling over WebRTC.
    You can download JsSIP from [JsSIP GitHub](https://github.com/versatica/JsSIP).

5. Create a WebRTC Interface:
    Create an HTML template with JavaScript and embed the JsSIP library to handle SIP signaling and WebRTC communication.
    Allow users to register their SIP extensions and make calls directly from Odoo.

 2.2 Example of Odoo Module Code for WebRTC SIP Client

 `models/webrtc_sip_client.py`:

```python
from odoo import models, fields

class WebRTCSipClient(models.Model):
    _name = 'synda.webrtc.sip.client'
    _description = 'WebRTC SIP Client'

    name = fields.Char('SIP Client Name', required=True)
    sip_extension = fields.Char('SIP Extension', required=True)
    sip_password = fields.Char('SIP Password', required=True)
    sip_server = fields.Char('SIP Server', required=True)
    user_id = fields.Many2one('res.users', string='User')
    registration_status = fields.Selection([('registered', 'Registered'), ('unregistered', 'Unregistered')], default='unregistered')

    def register_sip(self):
         Logic to register SIP extension (via JavaScript integration with JsSIP)
        pass
```

 `views/webrtc_sip_client_views.xml`:

```xml
<odoo>
    <record id="view_webrtc_sip_client_form" model="ir.ui.view">
        <field name="name">webrtc.sip.client.form</field>
        <field name="model">synda.webrtc.sip.client</field>
        <field name="arch" type="xml">
            <form>
                <sheet>
                    <group>
                        <field name="name"/>
                        <field name="sip_extension"/>
                        <field name="sip_password"/>
                        <field name="sip_server"/>
                    </group>
                    <footer>
                        <button string="Register SIP" type="object" name="register_sip"/>
                    </footer>
                </sheet>
            </form>
        </field>
    </record>
</odoo>
```



 Step 3: Integrate JsSIP for WebRTC in Odoo

 3.1 Include JsSIP in Odoo

1. Download JsSIP: 
    Download or include the JsSIP JavaScript library in your Odoo static assets.

2. Create a WebRTC FrontEnd:
    Embed the JsSIP library in your Odoo views to allow the SIP client to register and make calls.

   Example JavaScript (to be included in your Odoo module's `static/src/js/webrtc.js`):

```javascript
var socket = new JsSIP.WebSocketInterface('wss://<FreePBX Server>/ws');
var configuration = {
    sockets  : [ socket ],
    uri      : 'sip:<sip_extension>@<sip_server>',
    password : '<sip_password>',
};

var ua = new JsSIP.UA(configuration);

ua.start();
```

3. WebRTC Call Management:
    Add JavaScript functions to manage call events like `oncall`, `onhangup`, `onaccept`, etc.
    Enable features like hold, transfer, and mute, if necessary.



 Step 4: Implement Call Recording Functionality in Odoo

 4.1 Automatically Record Calls in FreePBX

 As configured in Step 1, FreePBX will handle the actual recording of calls. Ensure that all calls are recorded to the FreePBX server (in `/var/spool/asterisk/monitor/` by default).

 4.2 Manage Call Recordings in Odoo

1. Create Odoo Model for Recordings:
    Create a model in Odoo to track the metadata of call recordings (e.g., duration, date, user, partner, recording URL).

   Example:

```python
class CallRecording(models.Model):
    _name = 'synda.webrtc.sip.recording'
    _description = 'Call Recording'

    name = fields.Char('Recording Name')
    recording_url = fields.Char('Recording URL')
    recording_file = fields.Binary('Recording File')
    date = fields.Datetime('Call Date', default=fields.Datetime.now)
    duration = fields.Float('Call Duration (seconds)')
    user_id = fields.Many2one('res.users', string='User')
    partner_id = fields.Many2one('res.partner', string='Customer')
```

2. Upload Recordings:
    Use Odoo's API (XMLRPC or JSONRPC) to upload recordings once they are saved in FreePBX.

   You can set up a cron job to periodically check for new recordings and

 automatically upload them to Odoo.



 Step 5: Connect FreePBX with Odoo for Recording Management

1. Set Up Cron Jobs or Webhooks:
    Configure FreePBX to notify Odoo (via a webhook or API) when a call recording is available.
   
2. Automate the Recording Upload:
    Implement an automation in Odoo that fetches new recordings from FreePBX and uploads them to the Odoo `CallRecording` model.

3. Test the System:
    Verify that the SIP extension can be registered via Odoo and that calls can be made and recorded.
    Confirm that the recordings appear in Odoo with correct metadata and are accessible for download.



 Conclusion

This system integrates a WebRTC SIP client with FreePBX and Odoo, allowing users to register SIP extensions, make and receive calls, and automatically record those calls within Odoo. The integration also includes the ability to manage call recordings, associate them with Odoo entities (like customers and users), and provide seamless access to call metadata.



 License

This project is licensed under the MIT License  see the [LICENSE](LICENSE) file for details.
```

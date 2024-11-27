

from odoo import models, api

class EventHandler(models.AbstractModel):
    _name = 'event.handler'

    def handle_call_event(self, from_sip, to_sip, status):
        self.env['sip.call.history'].create({
            'from_sip': from_sip,
            'to_sip': to_sip,
            'status': status
        })

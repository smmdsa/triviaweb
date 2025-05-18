import axios from 'axios'

interface LeadPayload {
  id: string
  triviaId: string
  companyId: string
  responses: Array<{
    questionId: string
    answer: string
    correct: boolean
  }>
}

const ZAPIER_URL = process.env.ZAPIER_WEBHOOK_URL
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN
const SALESFORCE_TOKEN = process.env.SALESFORCE_TOKEN

export async function dispatchLead(lead: LeadPayload) {
  // Zapier generic webhook
  if (ZAPIER_URL) {
    try {
      await axios.post(ZAPIER_URL, lead)
    } catch (err) {
      console.error('Zapier webhook error', err)
    }
  }

  // HubSpot stub
  if (HUBSPOT_TOKEN) {
    try {
      await axios.post('https://api.hubapi.com/crm/v3/objects/contacts', lead, {
        headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}` },
      })
    } catch (err) {
      console.error('HubSpot push error', err)
    }
  }

  // Salesforce stub (bulk)
  if (SALESFORCE_TOKEN) {
    try {
      await axios.post('https://your-instance.salesforce.com/services/data/v60.0/composite/sobjects', { records: [lead] }, {
        headers: { Authorization: `Bearer ${SALESFORCE_TOKEN}` },
      })
    } catch (err) {
      console.error('Salesforce push error', err)
    }
  }
}
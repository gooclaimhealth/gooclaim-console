import { Template } from "@/types";

export const mockTemplates: Template[] = [
  {
    template_id: "TPL_STATUS_OK",
    name: "Claim Status — Verified",
    status: "active",
    version: "v3",
    content_en: "Your claim {{claim_id}} status is: {{status}}. Last updated: {{last_updated_at}}. For any queries, reply to this message.",
    content_hi: "आपका दावा {{claim_id}} की स्थिति है: {{status}}। अंतिम अपडेट: {{last_updated_at}}। किसी भी प्रश्न के लिए, इस संदेश का जवाब दें।",
    variables: ["claim_id", "status", "last_updated_at"],
    meta_approval: "approved",
    type: "status"
  },
  {
    template_id: "TPL_PENDING_DOCS",
    name: "Pending Documents",
    status: "active",
    version: "v2",
    content_en: "Claim {{claim_id}}: The following documents are pending — {{doc_list}}. Please upload at your earliest convenience.",
    content_hi: "दावा {{claim_id}}: निम्नलिखित दस्तावेज़ लंबित हैं — {{doc_list}}। कृपया जल्द से जल्द अपलोड करें।",
    variables: ["claim_id", "doc_list"],
    meta_approval: "approved",
    type: "pending_docs"
  },
  {
    template_id: "TPL_QUERY_REASON",
    name: "Query Reason Explanation",
    status: "active",
    version: "v1",
    content_en: "Claim {{claim_id}} has a query: {{query_reason}}. Required action: {{required_action}}.",
    content_hi: "दावा {{claim_id}} पर एक प्रश्न है: {{query_reason}}। आवश्यक कार्रवाई: {{required_action}}।",
    variables: ["claim_id", "query_reason", "required_action"],
    meta_approval: "approved",
    type: "query_reason"
  },
  {
    template_id: "TPL_REQUEST_CLAIM_ID",
    name: "Request Claim ID",
    status: "active",
    version: "v1",
    content_en: "We could not identify your claim. Please reply with your Claim ID (format: CLMxxxx) so we can assist you.",
    content_hi: "हम आपका दावा पहचान नहीं सके। कृपया अपनी दावा आईडी (प्रारूप: CLMxxxx) भेजें ताकि हम आपकी सहायता कर सकें।",
    variables: [],
    meta_approval: "approved",
    type: "system"
  },
  {
    template_id: "TPL_STALE_NOTICE",
    name: "Stale Data Notice",
    status: "active",
    version: "v1",
    content_en: "Claim {{claim_id}}: Our records were last updated on {{last_updated_at}}. We are refreshing your data and will update you shortly.",
    content_hi: "दावा {{claim_id}}: हमारे रिकॉर्ड {{last_updated_at}} को अंतिम बार अपडेट किए गए थे। हम आपका डेटा रिफ्रेश कर रहे हैं।",
    variables: ["claim_id", "last_updated_at"],
    meta_approval: "approved",
    type: "status"
  },
  {
    template_id: "TPL_ESCALATION_ACK",
    name: "Escalation Acknowledgment",
    status: "inactive",
    version: "v2",
    content_en: "Your query regarding claim {{claim_id}} has been escalated to our senior team. Reference: {{ticket_id}}. You will hear back within 24 hours.",
    content_hi: "दावा {{claim_id}} के बारे में आपकी क्वेरी हमारी वरिष्ठ टीम को भेज दी गई है। संदर्भ: {{ticket_id}}। आपको 24 घंटे के भीतर जवाब मिलेगा।",
    variables: ["claim_id", "ticket_id"],
    meta_approval: "approved",
    type: "system"
  }
];

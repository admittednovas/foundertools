export const Articles = {"id":{"type":"integer","required":true},"pagename":{"type":"text","maxLength":35},"spotkey":{"type":"text","maxLength":100},"categoryid":{"type":"integer"},"articletitle":{"type":"text","maxLength":100},"articlecaption":{"type":"text","maxLength":100},"lastmodified":{"type":"date-time"},"metatag_title":{"type":"text","maxLength":255},"metatag_description":{"type":"text","maxLength":255},"lastmodby":{"type":"integer"},"articlebody":{"type":"text"},"metatag_keywords":{"type":"text"},"custom_metatags_override":{"type":"text"},"excludefrom_sitemap":{"type":"enum","enumvals":["Y","N"]}}
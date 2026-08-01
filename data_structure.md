# ArCode Data Structure

## الشكل الأساسي للمصطلح:

```json
{
  "ACS_ID": "ACS-XX-0000",
  "AR_TERM": "المصطلح بالعربية",
  "EN_TERM": "English Term",
  "DOMAIN": "Scientific Domain",
  "DEFINITION_AR": "تعريف عربي واضح",
  "DEFINITION_EN": "Clear English definition",
  "STATUS": "Draft | Approved | Deprecated",
  "SOURCE": "ISO/IEC 2382"
}
```

## الحقول الاختيارية:

```json
{
  "RELATIONS": ["مصطلح مرتبط", "Another Term"],
  "VERSION": "1.0",
  "NOTES": "ملاحظات إضافية"
}
```

## قواعد مهمة:
- كل المصطلحات في `dictionary.json` يجب أن تلتزم بـ `standard.json`
- لا يمكن حذف مصطلح بعد اعتماده
- التعديل يتم عبر إصدار جديد
- كل مصطلح يجب أن يكون قابل للفهم بدون سياق خارجي
- كل مصطلح يجب أن يستند إلى مصدر موثوق (`SOURCE`) — انظر `terminology_process.md`
- رموز المجالات محددة في `domain_list.json` و `id_system.md`

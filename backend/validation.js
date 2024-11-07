const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 35,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 6,
};

const adminValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> 欄位不能空白.",
        "string.email": "<b>Email</b> 格式不正確.",
      }),
    password: passwordComplexity(complexityOptions).messages({
      "string.empty": "<b>密碼</b> 欄位不能空白.",
      "passwordComplexity.tooShort": "<b>密碼</b> 必須包含至少 <b>6位字符</b>.",
      "passwordComplexity.lowercase":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
      "passwordComplexity.uppercase":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
      "passwordComplexity.symbol":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
      "passwordComplexity.numeric":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
    }),
    remember: Joi.boolean(),
  });
  return schema.validate(data);
};

const signUpValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.empty": "<b>名字</b> 欄位不能空白.",
        "string.pattern.base": "<b>名字</b> 必須為<b>中文漢字</b>.",
      }),
    lastName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.empty": "<b>姓氏</b> 欄位不能空白.",
        "string.pattern.base": "<b>姓氏</b> 必須為<b>中文漢字</b>.",
      }),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).messages({
      "string.empty": "<b>Email</b> 欄位不能空白.",
      "string.email": "<b>Email</b> 格式不正確.",
    }),
    password: passwordComplexity(complexityOptions).messages({
      "string.empty":
        "<b>註冊失敗</b>. </br>請注意您的密碼必須包含以下: </br>至少<b>6個英文字母</b>,</br>至少<b>1個小寫英文字母</b>,</br>至少<b>1個大寫英文字母</b>和</br>至少<b>1個數字</b>.",
      "passwordComplexity.tooShort": "<b>密碼</b> 必須包含至少 <b>6位字符</b>.",
      "passwordComplexity.lowercase":
        "<b>密碼</b> 必須包含至少 <b>1個小寫英文字母</b>.",
      "passwordComplexity.uppercase":
        "<b>密碼</b> 必須包含至少 <b>1個大寫英文字母</b>.",
      "passwordComplexity.numeric": "<b>密碼</b> 必須包含至少 <b>1個數字</b>.",
    }),
  });
  return schema.validate(data);
};

const signUpInternational = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>First Name</b> field should not be blank.",
        "string.min":
          "<b>First Name</b> field should have at least 2 characters in length.",
        "string.pattern.base":
          "<b>First Name</b> must only have <b>alphabetical characters</b>.",
      }),
    lastName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>Surname</b> field should not be blank.",
        "string.min":
          "<b>Surname</b> field should have at least 2 characters in length.",
        "string.pattern.base":
          "<b>Surname</b> must only have <b>alphabetical characters</b>.",
      }),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).messages({
      "string.empty": "<b>Email</b> field should not be blank.",
      "string.email":
        "<b>Email</b> must include '@' in the Email address or includes formatting errors.",
    }),
    password: passwordComplexity(complexityOptions).messages({
      "string.empty":
        "<b>Invalid sign up details</b>. </br>Please note Password needs to contain: </br>at least <b>6 characters in length</b>,</br>at least <b>1 lower case character</b>,</br>at least <b>1 upper case character</b> and</br>at least <b>1 numeric number</b>.",
      "passwordComplexity.tooShort":
        "<b>Password</b> field contain at least <b>6 characters</b>.",
      "passwordComplexity.lowercase":
        "<b>Password</b> should contain at least <b>1 lower case character</b>.",
      "passwordComplexity.uppercase":
        "<b>Password</b> should contain at least <b>1 upper case character</b>.",
      "passwordComplexity.numeric":
        "<b>Password</b> should contain at least <b>1 numeric number</b>.",
    }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.max": "Your account is registered in our English Website.",
        "string.pattern.base":
          "Your account is registered in our English Website.",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> 欄位不能空白.",
        "string.email": "<b>Email</b> 格式不正確.",
      }),
    password: passwordComplexity(complexityOptions).messages({
      "string.empty": "<b>密碼</b> 欄位不能空白.",
      "passwordComplexity.tooShort":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
      "passwordComplexity.lowercase":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
      "passwordComplexity.uppercase":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
      "passwordComplexity.symbol":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
      "passwordComplexity.numeric":
        "<b>Email</b> 或 <b>密碼</b>不正確. 請確認再輸入.",
    }),
    remember: Joi.boolean(),
  });
  return schema.validate(data);
};

const loginInternational = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.min": "系統查詢到您是在愛課網中文版做註冊的.",
        "string.pattern.base": "系統查詢到您是在愛課網中文版做註冊的.",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> field should not be blank.",
        "string.email":
          "<b>Email</b> must include '@' in the Email address or includes formatting errors.",
      }),
    password: passwordComplexity(complexityOptions).messages({
      "string.empty":
        "<b>Invalid sign up details</b>. </br>Please note Password needs to contain: </br>at least <b>6 characters in length</b>,</br>at least <b>1 lower case character</b>,</br>at least <b>1 upper case character</b> and</br>at least <b>1 numeric number</b>",
      "passwordComplexity.tooShort":
        "<b>Email</b> or <b>Password</b> incorrect. Please check your inputs and try again.",
      "passwordComplexity.lowercase":
        "<b>Email</b> or <b>Password</b> incorrect. Please check your inputs and try again.",
      "passwordComplexity.uppercase":
        "<b>Email</b> or <b>Password</b> incorrect. Please check your inputs and try again.",
      "passwordComplexity.numeric":
        "<b>Email</b> or <b>Password</b> incorrect. Please check your inputs and try again.",
    }),
    remember: Joi.boolean(),
  });
  return schema.validate(data);
};

const smValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.empty": "<b>名字</b> 欄位不能空白.",
        "string.max": "<b>名字</b> 不能超過兩個漢字.",
        "string.pattern.base": "<b>名字</b> 必須為<b>中文漢字</b>.",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> 欄位不能空白.",
        "string.email": "<b>Email</b> 格式不正確.",
      }),
  });
  return schema.validate(data);
};

const smInternational = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>First Name</b> field should not be blank.",
        "string.min":
          "<b>First Name</b> field should have at least 2 characters in length.",
        "string.pattern.base":
          "<b>First Name</b> must only have <b>alphabetical characters</b>.",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> field should not be blank.",
        "string.email":
          "<b>Email</b> must include '@' in the Email address or includes formatting errors.",
      }),
  });
  return schema.validate(data);
};

const step1Validation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.empty": "<b>名字</b> 欄位不能空白.",
        "string.max": "<b>名字</b> 欄位不能超過兩個中文漢字.",
        "string.pattern.base": "<b>名字</b> 必須為<b>中文漢字</b>.",
      }),
    lastName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.empty": "<b>姓氏</b> 欄位不能空白.",
        "string.max": "<b>姓氏</b> 欄位不能超過兩個中文漢字.",
        "string.pattern.base": "<b>姓氏</b> 必須為<b>中文漢字</b>.",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> 欄位不能空白.",
        "string.email": "<b>Email</b> 格式不正確.",
      }),
    phone: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([0]{1})[0-9]{9}$"))
      .pattern(new RegExp("(?:0[9])"))
      .messages({
        "string.empty": "<b>行動電話</b> 欄位不能空白.",
        "string.min": "<b>行動電話</b> 必須有10個數字.",
        "string.pattern.base":
          "<b>行動電話</b> 必須為<b>數字, 且前兩個開頭數字必須為09</b>.",
      }),
    nationality: Joi.string()
      .trim()
      .min(2)
      .max(25)
      .required()
      .pattern(new RegExp("^[a-zA-Z-0-9- \u4e00-\u9fa5]{2,25}$"))
      .messages({
        "string.empty": "<b>國籍</b> 欄位不能空白.",
      }),
    nationalId: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([A-Za-z]{1})[0-9]{9}$"))
      .messages({
        "string.empty": "<b>身份證字號</b> 欄位不能空白.",
        "string.min":
          "<b>身份證字號</b> 必須含有<b>一個英文字母及9位數字之合併</b>.",
        "string.pattern.base":
          "<b>身份證字號</b> 必須含有<b>第一個字母需為一個英文字母及9位數字之合併</b>. 例如：E123456789",
      }),
    country: Joi.string()
      .trim()
      .min(2)
      .max(2)
      .valid("台灣")
      .required()
      .messages({
        "string.empty": "收尋區域必須在台灣範圍內.",
        "string.min": "收尋區域必須在台灣範圍內.",
        "any.only": "收尋區域必須在台灣範圍內.",
      }),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    postalCode: Joi.string().trim().min(3).max(5).allow(""),
    street: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "居住位置必須包含路名.",
      "string.min": "居住位置必須包含路名.",
    }),
    streetNo: Joi.string()
      .trim()
      .min(1)
      .max(10)
      .allow("")
      .pattern(new RegExp("^[a-zA-Z-0-9 \u4e00-\u9fa5]{1,10}$")),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  });
  return schema.validate(data);
};

const step1International = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>First Name</b> field should not be blank.",
        "string.min":
          "<b>First Name</b> field should have at least 2 characters in length.",
        "string.pattern.base":
          "<b>First Name</b> must only have <b>alphabetical characters</b>.",
      }),
    lastName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>Surname</b> field should not be blank.",
        "string.min":
          "<b>Surname</b> field should have at least 2 characters in length.",
        "string.pattern.base":
          "<b>Surname</b> must only have <b>alphabetical characters</b>.",
      }),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).messages({
      "string.empty": "<b>Email</b> field should not be blank.",
      "string.email":
        "<b>Email</b> must include '@' in the Email address or includes formatting errors.",
    }),
    phone: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([0]{1})[0-9]{9}$"))
      .pattern(new RegExp("(?:0[9])"))
      .messages({
        "string.empty": "<b>Mobile</b> field should not be blank.",
        "string.min":
          "<b>Mobile</b> field should have exactly 10 numeric digits in length.",
        "string.pattern.base":
          "<b>Mobile</b> field must be in<b> numeric digits, and the commencing first 2 digits must be 09</b>.",
      }),
    nationalId: Joi.string()
      .trim()
      .min(3)
      .max(25)
      .required()
      .pattern(new RegExp("^[a-zA-Z- 0-9]{3,25}$"))
      .messages({
        "string.empty": "<b>Passport number</b> field should not be blank.",
        "string.min":
          "<b>Passport number</b> field<b> must have at least 3 characters in length</b>.",
        "string.pattern.base":
          "<b>Passport number</b> field<b> must have at least 3 characters in length</b>.",
      }),
    nationality: Joi.string()
      .trim()
      .min(2)
      .max(25)
      .required()
      .pattern(new RegExp("^[a-zA-Z-0-9- \u4e00-\u9fa5]{2,25}$"))
      .messages({
        "string.empty": "<b>Nationality</b> field cannot be blank.",
      }),
    country: Joi.string().trim().min(2).max(9).allow(""),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    postalCode: Joi.string().trim().min(3).max(5).allow(""),
    street: Joi.string().trim().min(2).max(50).allow(""),
    streetNo: Joi.string()
      .trim()
      .min(1)
      .max(10)
      .allow("")
      .pattern(new RegExp("^[a-zA-Z-0-9 \u4e00-\u9fa5]{1,10}$")),
    longitude: Joi.number().allow(""),
    latitude: Joi.number().allow(""),
  });
  return schema.validate(data);
};

const teacherInternational = (data) => {
  const schema = Joi.object({
    phone: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([0]{1})[0-9]{9}$"))
      .messages({
        "string.empty": "<b>Mobile</b> field should not be blank.",
        "string.min":
          "<b>Mobile</b> field should have exactly 10 numeric digits in length.",
        "string.pattern.base":
          "<b>Mobile</b> field must be in<b> numeric digits, and the commencing first 2 digits must be 09 or 04</b>.",
      }),
    country: Joi.string().trim().min(2).max(9).allow(""),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    postalCode: Joi.string().trim().min(3).max(5).allow(""),
    street: Joi.string().trim().min(2).max(50).allow(""),
    streetNo: Joi.string().allow(""),
    longitude: Joi.number().allow("").allow(null),
    latitude: Joi.number().allow("").allow(null),
    _id: Joi.string(),
    isTeacher: Joi.boolean(),
    newsletter: Joi.boolean(),
    SMStext: Joi.boolean(),
    photo: Joi.string().allow(""),
  });
  return schema.validate(data);
};

const teacherValidation = (data) => {
  const schema = Joi.object({
    phone: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([0]{1})[0-9]{9}$"))
      .pattern(new RegExp("(?:0[9])"))
      .messages({
        "string.empty": "<b>行動電話</b> 欄位不能空白.",
        "string.min": "<b>行動電話</b> 必須有10個數字.",
        "string.pattern.base":
          "<b>行動電話</b> 必須為<b>數字, 且前兩個開頭數字必須為09</b>.",
      }),
  
 
    country: Joi.string()
      .trim()
      .min(2)
      .max(2)
      .valid("台灣")
      .required()
      .messages({
        "string.empty": "收尋區域必須在台灣範圍內.",
        "string.min": "收尋區域必須在台灣範圍內.",
        "any.only": "收尋區域必須在台灣範圍內.",
      }),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    postalCode: Joi.string().trim().min(3).max(5).allow(""),
    street: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "居住位置必須包含路名.",
      "string.min": "居住位置必須包含路名.",
    }),
    streetNo: Joi.string()
      .trim()
      .min(1)
      .max(10)
      .allow("")
      .pattern(new RegExp("^[a-zA-Z-0-9 \u4e00-\u9fa5]{1,10}$")),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    _id: Joi.string(),
    nanoId: Joi.string(),
    isTeacher: Joi.boolean(),
    newsletter: Joi.boolean(),
    SMStext: Joi.boolean(),
    photo: Joi.string().allow(""),
  });
  return schema.validate(data);
};

const detailsInternational = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>First Name</b> field should not be blank.",
        "string.min":
          "<b>First Name</b> field should have at least 2 characters in length.",
        "string.max":
          "<b>First Name</b> field should not exceed 35 characters in length.",
        "string.pattern.base":
          "<b>First Name</b> must only have <b>alphabetical characters</b>.",
      }),

    lastName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>Surname</b> field should not be blank.",
        "string.min":
          "<b>Surname</b> field should have at least 2 characters in length.",
        "string.max":
          "<b>Surname</b> field should not exceed 35 characters in length.",
        "string.pattern.base":
          "<b>Surname</b> must only have <b>alphabetical characters</b>.",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> field should not be blank.",
        "string.email":
          "<b>Email</b> must include '@' in the Email address or it may include some formatting errors.",
      }),
    phone: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([0]{1})[0-9]{9}$"))
      .pattern(new RegExp("(?:0[9])"))
      .messages({
        "string.empty": "<b>Mobile</b> field should not be blank.",
        "string.min":
          "<b>Mobile</b> field should have exactly 10 numeric digits in length.",
        "string.pattern.base":
          "<b>Mobile</b> field must be in<b> numeric digits, and the commencing first 2 digits must be 09</b>.",
      }),
    nationalId: Joi.string()
      .trim()
      .min(3)
      .max(25)
      .required()
      .pattern(new RegExp("^[a-zA-Z- 0-9]{3,25}$"))
      .messages({
        "string.empty": "<b>Passport number</b> field should not be blank.",
        "string.min":
          "<b>Passport number</b> field<b> must have at least 3 characters in length</b>.",
        "string.pattern.base":
          "<b>Passport number</b> field<b> must have at least 3 characters in length</b>.",
      }),

    gender: Joi.string()
      .trim()
      .min(1)
      .max(6)
      .required()
      .pattern(new RegExp("^[a-zA-Z- ]{1,6}$"))
      .messages({
        "string.empty": "<b>Gender</b> field should not be blank.",
      }),
    birth: Joi.string()
      .trim()
      .min(9)
      .max(12)
      .required()
      .pattern(new RegExp("^[a-zA-Z- 0-9]{9,12}$"))
      .messages({
        "string.empty": "<b>Birth Date</b> field should not be blank.",
        "string.pattern.base":
          "Please use the dropdown calendar to select your <b>Birth Date</b>.",
      }),
    survey: Joi.string()
      .trim()
      .min(1)
      .max(25)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{1,25}$"))
      .messages({
        "string.empty": "<b>Survey</b> field should not be blank.",
      }),
    country: Joi.string()
      .trim()
      .min(2)
      .max(2)
      .valid("台灣")
      .required()
      .messages({
        "string.empty":
          "The search area needs to be within the jurisdiction of Taiwan.",
        "string.min":
          "The search area needs to be within the jurisdiction of Taiwan.",
        "any.only":
          "The search area needs to be within the jurisdiction of Taiwan.",
      }),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    postalCode: Joi.string().trim().min(3).max(5).allow(""),
    street: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "The address need to at least include a street name.",
      "string.min": "The address need to at least include a street name.",
    }),
    streetNo: Joi.string()
      .trim()
      .min(1)
      .max(10)
      .allow("")
      .pattern(new RegExp("^[a-zA-Z-0-9 \u4e00-\u9fa5]{1,10}$")),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    filename: Joi.string(),
  });
  return schema.validate(data);
};

const detailsValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.empty": "<b>名字</b> 欄位不能空白.",
        "string.max": "<b>名字</b> 欄位不能超過兩個中文漢字.",
        "string.pattern.base": "<b>名字</b> 必須為<b>中文漢字</b>.",
      }),
    lastName: Joi.string()
      .trim()
      .min(1)
      .max(2)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1,2}$"))
      .messages({
        "string.empty": "<b>姓氏</b> 欄位不能空白.",
        "string.max": "<b>姓氏</b> 欄位不能超過兩個中文漢字.",
        "string.pattern.base": "<b>姓氏</b> 必須為<b>中文漢字</b>.",
      }),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .messages({
        "string.empty": "<b>Email</b> 欄位不能空白.",
        "string.email": "<b>Email</b> 格式不正確.",
      }),
    phone: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([0]{1})[0-9]{9}$"))
      .pattern(new RegExp("(?:0[9])"))
      .messages({
        "string.empty": "<b>行動電話</b> 欄位不能空白.",
        "string.min": "<b>行動電話</b> 必須有10個數字.",
        "string.pattern.base":
          "<b>行動電話</b> 必須為<b>數字, 且前兩個開頭數字必須為09</b>.",
      }),
    nationalId: Joi.string()
      .trim()
      .min(10)
      .max(10)
      .required()
      .pattern(new RegExp("^([A-Za-z]{1})[0-9]{9}$"))
      .messages({
        "string.empty": "<b>身份證字號</b> 欄位不能空白.",
        "string.min":
          "<b>身份證字號</b> 必須含有<b>一個英文字母及9位數字之合併</b>.",
        "string.pattern.base":
          "<b>身份證字號</b> 必須含有<b>第一個字母需為一個英文字母及9位數字之合併</b>. 例如：E123456789",
      }),
    gender: Joi.string()
      .trim()
      .min(1)
      .max(1)
      .required()
      .pattern(new RegExp("^[\u4e00-\u9fa5]{1}$"))
      .messages({
        "string.empty": "<b>性別</b> 欄位不能空白.",
      }),
    birth: Joi.string()
      .trim()
      .min(9)
      .max(13)
      .required()
      .pattern(new RegExp("^[0-9 \u4e00-\u9fa5]{9,13}$"))
      .messages({
        "string.empty": "<b>出生日期</b> 欄位不能空白.",
        "string.pattern.base": "請利用日曆選擇<b>出生日期</b>.",
      }),
    survey: Joi.string()
      .trim()
      .min(1)
      .max(10)
      .required()
      .pattern(new RegExp("^[a-zA-Z- \u4e00-\u9fa5]{1,10}$"))
      .messages({
        "string.empty": "請幫我們填寫<b>問卷問題</b>.",
      }),
    country: Joi.string()
      .trim()
      .min(2)
      .max(2)
      .valid("台灣")
      .required()
      .messages({
        "string.empty": "收尋區域必須在台灣範圍內.",
        "string.min": "收尋區域必須在台灣範圍內.",
        "any.only": "收尋區域必須在台灣範圍內.",
      }),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    postalCode: Joi.string().trim().min(3).max(5).allow(""),
    street: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "上課地點必須包含路名.",
      "string.min": "上課地點必須包含路名.",
    }),
    streetNo: Joi.string()
      .trim()
      .min(1)
      .max(10)
      .allow("")
      .pattern(new RegExp("^[a-zA-Z-0-9 \u4e00-\u9fa5]{1,10}$")),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    filename: Joi.string(),
  });
  return schema.validate(data);
};

const question6Validation = (data) => {
  const schema = Joi.object({
    normal_rate: Joi.string()
      .trim()
      .min(3)
      .max(5)
      .required()
      // .pattern(new RegExp("^[0-9]{5}$"))
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.empty": "<b>時薪</b> 欄位不能空白.",
        "string.min": "<b>時薪</b> 必須至少100元一小時.",
        "string.pattern.base": "<b>時薪</b> 必須至少100元一小時.",
      }),
    home_rate: Joi.string()
      .trim()
      .min(2)
      .max(5)
      .allow("")
      // .pattern(new RegExp("^[0-9]{3,5}$"))
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.min": "<b>到府授課時薪</b> 必須至少100元一小時.",
        "string.pattern.base": "<b>到府授課時薪</b> 必須至少100元一小時.",
      }),
    zoom_rate: Joi.string()
      .trim()
      .min(2)
      .max(5)
      .allow("")
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.min": "<b>線上授課時薪</b> 必須至少100元一小時.",
        "string.pattern.base": "<b>線上授課時薪</b> 必須至少100元一小時.",
      })
      .options({
        stripUnknown: true,
        abortEarly: false,
        allowUnknown: true,
      }),
    transport: Joi.boolean(),
    foreigner: Joi.boolean(),
    home_tutoring: Joi.boolean(),
  });

  return schema.validate(data);
};

const question6International = (data) => {
  const schema = Joi.object({
    normal_rate: Joi.string()
      .trim()
      .min(3)
      .max(5)
      .required()
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.empty": "<b>Hourly Rate</b> field cannot be blank.",
        "string.min": "<b>Hourly Rate</b> needs to be at least NTD 100.",
        "string.pattern.base":
          "<b>Hourly Rate</b> needs to be at least NTD 100.",
      }),
    home_rate: Joi.string()
      .trim()
      .min(2)
      .max(5)
      .allow("")
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.min": "<b>Home hourly rate</b> needs to be at least NTD 100.",
        "string.pattern.base":
          "<b>Home hourly rate</b> needs to be at least NTD 100.",
      }),
    zoom_rate: Joi.string()
      .trim()
      .min(2)
      .max(5)
      .allow("")
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.min": "<b>Online hourly rate</b> needs to be at least NTD 100.",
        "string.pattern.base":
          "<b>Online hourly rate</b> needs to be at least NTD 100.",
      })
      .options({
        stripUnknown: true,
        abortEarly: false,
        allowUnknown: true,
      }),
    transport: Joi.boolean(),
    foreigner: Joi.boolean(),
    home_tutoring: Joi.boolean(),
  });

  return schema.validate(data);
};

const question7Validation = (data) => {
  const schema = Joi.object({
    about: Joi.string().trim().min(50).max(300).required().messages({
      "string.empty": "此欄位不能空白.",
      "string.min": "必須至少需填寫50個字以上.",
    }),
  });

  return schema.validate(data);
};

const question7International = (data) => {
  const schema = Joi.object({
    about: Joi.string().trim().min(50).max(800).required().messages({
      "string.empty": "This field cannot be blank.",
      "string.min": "A minimum of 50 characters is required.",
      "string.max": "A limitation of 800 characters is permitted.",
    }),
  });
  return schema.validate(data);
};

const questionGoogleMapValidation = (data) => {
  const schema = Joi.object({
    street: Joi.string().trim().min(1).max(50).required().messages({
      "string.empty": "上課地點必須包含路名.",
      "string.min": "上課地點必須包含路名.",
    }),
    country: Joi.string()
      .trim()
      .min(2)
      .max(2)
      .valid("台灣")
      .required()
      .messages({
        "string.empty": "收尋區域必須在台灣範圍內.",
        "string.min": "收尋區域必須在台灣範圍內.",
        "any.only": "收尋區域必須在台灣範圍內.",
      }),
  });
  return schema.validate(data);
};

const passwordChangeConfirmation = (data) => {
  const schema = Joi.object({
    password: passwordComplexity(complexityOptions).messages({
      "string.empty":
        "<b>更新密碼提示</b>. </br>請注意您的密碼必須包含以下: </br>至少<b>6個英文字母</b>,</br>至少<b>1個小寫英文字母</b>,</br>至少<b>1個大寫英文字母</b>,</br>至少<b>1個數字</b>和</br>至少<b>1個特殊字符</b>.",
      "passwordComplexity.tooShort": "<b>密碼</b> 必須包含至少 <b>6位字符</b>.",
      "passwordComplexity.lowercase":
        "<b>密碼</b> 必須含有至少 <b>1個小寫英文字母</b>.",
      "passwordComplexity.uppercase":
        "<b>密碼</b> 必須含有至少 <b>1個大寫英文字母</b>.",

      "passwordComplexity.numeric": "<b>密碼</b> 必須包含至少 <b>1個數字</b>.",
    }),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "<b>重複輸入的密碼</b> 跟新密碼不符合." }),
  });
  return schema.validate(data);
};

const passwordChangeIntl = (data) => {
  const schema = Joi.object({
    password: passwordComplexity(complexityOptions).messages({
      "string.empty":
        "<b>Invalid password inputs</b>. </br>Please note Password needs to contain: </br>at least <b>6 characters in length</b>,</br>at least <b>1 lower case character</b>,</br>at least <b>1 upper case character</b> and</br>at least <b>1 numeric number</b>.",
      "passwordComplexity.tooShort":
        "<b>Password</b> field contain at least <b>6 characters</b>.",
      "passwordComplexity.lowercase":
        "<b>Password</b> should contain at least <b>1 lower case character</b>.",
      "passwordComplexity.uppercase":
        "<b>Password</b> should contain at least <b>1 upper case character</b>.",
      "passwordComplexity.numeric":
        "<b>Password</b> should contain at least <b>1 numeric number</b>.",
    }),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({ "any.only": "<b>New passwords</b> do not match." }),
  });
  return schema.validate(data);
};

const applicationValidation = (data) => {
  const schema = Joi.object({
    yourpay: Joi.string()
      .trim()
      .min(3)
      .max(5)
      .required()
      // .pattern(new RegExp("^[0-9]{5}$"))
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.empty": "<b>時薪</b> 欄位不能空白.",
        "string.min": "<b>時薪</b> 必須至少100元一小時.",
        "string.pattern.base": "<b>時薪</b> 必須至少100元一小時.",
      })
      .options({
        stripUnknown: true,
        abortEarly: false,
        allowUnknown: true,
      }),
    firstName: Joi.string(),
    lastName: Joi.string(),
    hometutor: Joi.string(),
    onlinetutor: Joi.string(),
    nanoId: Joi.string(),
    slugId: Joi.string(),
    nanoslug: Joi.string(),
    caseId: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    startDate: Joi.string(),
    finishDate: Joi.string(),
    photo: Joi.string(),
    isTeacher: Joi.boolean(),
    streetNo: Joi.string().trim().min(1).max(10).allow(""),
    street: Joi.string().trim().min(1).max(50),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    country: Joi.string().trim().min(1).max(2).valid("台灣"),
    latitude: Joi.number(),
    longitude: Joi.number(),
  });

  return schema.validate(data);
};

const applicationInternational = (data) => {
  const schema = Joi.object({
    yourpay: Joi.string()
      .trim()
      .min(3)
      .max(5)
      .required()
      .pattern(new RegExp("^([1-9]{1})[0-9]{2,5}$"))
      .messages({
        "string.empty": "<b>Hourly Rate</b> field cannot be blank.",
        "string.min": "<b>Hourly Rate</b> needs to be at least NTD 100.",
        "string.pattern.base":
          "<b>Hourly Rate</b> needs to be at least NTD 100.",
      })
      .options({
        stripUnknown: true,
        abortEarly: false,
        allowUnknown: true,
      }),
    firstName: Joi.string(),
    lastName: Joi.string(),
    hometutor: Joi.string(),
    onlinetutor: Joi.string(),
    nanoId: Joi.string(),
    slugId: Joi.string(),
    nanoslug: Joi.string(),
    caseId: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    startDate: Joi.string(),
    finishDate: Joi.string(),
    photo: Joi.string(),
    isTeacher: Joi.boolean(),
    streetNo: Joi.string().trim().min(1).max(10).allow(""),
    street: Joi.string().trim().min(1).max(50),
    city: Joi.string().trim().min(3).max(3).allow(""),
    state: Joi.string().trim().min(3).max(3).allow(""),
    suburb: Joi.string().trim().min(2).max(25).allow(""),
    country: Joi.string().trim().min(1).max(2).valid("台灣"),
    latitude: Joi.number(),
    longitude: Joi.number(),
  });

  return schema.validate(data);
};

const courseValidationIntl = (data) => {
  const schema = Joi.object({
    trial_rate: Joi.string()
      .trim()
      .min(1)
      .max(5)
      .allow("")
      .pattern(new RegExp("^[1-9][0-9]*$"))
      .messages({
        "string.empty": "<b>Trial hourly Rate</b> field cannot be blank.",
        "string.min": "<b>Trial hourly Rate</b> needs to be at least AUD 1.",
        "string.pattern.base":
          "<b>Trial hourly Rate</b> needs to be at least AUD 1 and be an integer.",
      }),

    zoom_rate: Joi.string()
      .trim()
      .min(1)
      .max(5)
      .allow("")
      .pattern(new RegExp("^[1-9][0-9]*$"))
      .messages({
        "string.min": "<b>Online hourly rate</b> needs to be at least AUD 1.",
        "string.pattern.base":
          "<b>Online hourly rate</b> needs to be at least AUD 1 and be an integer.",
      })
      .options({
        stripUnknown: true,
        abortEarly: false,
        allowUnknown: true,
      }),
    onsite_rate: Joi.string()
      .trim()
      .min(1)
      .max(5)
      .allow("")
      .pattern(new RegExp("^[1-9][0-9]*$"))
      .messages({
        "string.min": "<b>On-site hourly rate</b> needs to be at least AUD 1.",
        "string.pattern.base":
          "<b>On-site hourly rate</b>needs to be at least AUD 1 and be an integer.",
      })
      .options({
        stripUnknown: true,
        abortEarly: false,
        allowUnknown: true,
      }),
    nanoId: Joi.string(),
    firstName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>First Name</b> field should not be blank.",
        "string.min":
          "<b>First Name</b> field should have at least 2 characters in length.",
        "string.pattern.base":
          "<b>First Name</b> must only have <b>alphabetical characters</b>.",
      }),
    lastName: Joi.string()
      .trim()
      .min(2)
      .max(35)
      .required()
      .pattern(new RegExp("^[a-zA-Z- çôéè]{2,35}$"))
      .messages({
        "string.empty": "<b>Surname</b> field should not be blank.",
        "string.min":
          "<b>Surname</b> field should have at least 2 characters in length.",
        "string.pattern.base":
          "<b>Surname</b> must only have <b>alphabetical characters</b>.",
      }),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).messages({
      "string.empty": "<b>Email</b> field should not be blank.",
      "string.email":
        "<b>Email</b> must include '@' in the Email address or includes formatting errors.",
    }),
    description: Joi.string(),
    zoom: Joi.boolean(),
    trial: Joi.boolean(),
    online: Joi.string(),
    category: Joi.string(),
    subject: Joi.string(),
    subject_en: Joi.string(),
  });

  return schema.validate(data);
};

module.exports.detailsValidation = detailsValidation;
module.exports.question6Validation = question6Validation;
module.exports.question7Validation = question7Validation;
module.exports.questionGoogleMapValidation = questionGoogleMapValidation;
module.exports.adminValidation = adminValidation;
module.exports.loginValidation = loginValidation;
module.exports.signUpValidation = signUpValidation;
module.exports.teacherInternational = teacherInternational;
module.exports.teacherValidation = teacherValidation;
module.exports.passwordChangeConfirmation = passwordChangeConfirmation;
module.exports.passwordChangeIntl = passwordChangeIntl;
module.exports.applicationValidation = applicationValidation;
module.exports.step1Validation = step1Validation;
module.exports.signUpInternational = signUpInternational;
module.exports.loginInternational = loginInternational;
module.exports.detailsInternational = detailsInternational;
module.exports.applicationInternational = applicationInternational;
module.exports.step1International = step1International;
module.exports.question6International = question6International;
module.exports.question7International = question7International;
module.exports.smValidation = smValidation;
module.exports.smInternational = smInternational;
module.exports.courseValidationIntl = courseValidationIntl;

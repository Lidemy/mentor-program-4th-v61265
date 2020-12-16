import { useEffect, useState } from "react";

export default function useForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [how, setHow] = useState("");
  const [other, setOther] = useState("");
  const [checkMode, setCheckMode] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  const handleInputChange = (setValue, e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckMode(true);
    if (
      !name ||
      !email ||
      !phone ||
      !type ||
      !how ||
      !isValidEmail ||
      !isValidPhone
    ) {
      return alert("oops！好像有東西填錯囉！");
    }
    return alert(`請確認以下資訊：
        暱稱：${name}
        電子郵件：${email}
        電話號碼：${phone}
        報名類型：${
          type === "imaging" ? "躺在床上用想像力實作" : "趴在地上滑手機找現成的"
        }
        如何得知這個活動：${how}
        其他：${other}
    `);
  };

  useEffect(() => {
    const regexForEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (regexForEmail.test(email)) setIsValidEmail(true);
    const regexForPhone = /^09\d{2}-?\d{3}-?\d{3}$/;
    if (regexForPhone.test(phone)) setIsValidPhone(true);
  }, [name, email, phone, type, how, other]);

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    type,
    setType,
    how,
    setHow,
    other,
    setOther,
    handleInputChange,
    checkMode,
    handleSubmit,
    isValidEmail,
    isValidPhone,
  };
}

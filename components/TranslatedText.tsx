import Bi from "./BilingualText"
import { ko } from "@/lib/korean"
export default function TranslatedText({text}:{text:string}) {
  const korean = ko(text)
  return korean ? <Bi en={text} ko={korean} /> : <>{text}</>
}

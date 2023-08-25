import notify from "@utils/notify"

const copyText = (text: any) => {
  navigator.clipboard.writeText(text)
  notify(`Скопировано: ${text?.length > 10 ? text?.slice(0,9) + '...' : text}`, 'SUCCESS')
}

export default copyText;
import * as client from "./client";

export async function* watchStream() {
  let response = await fetch(`${client.apiRoot}/stream`, client.fetchOptions);
  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const textData = new TextDecoder("utf-8").decode(value);
    if (textData.startsWith(": ping")) {
      yield decodePing(textData);
    } else if (textData.startsWith("data: ")) {
      yield decodeData(textData);
    }
  }
}

function decodePing(textValue) {
  return { ping: true };
}

function decodeData(textValue) {
  const strippedTextValue = textValue.replace(/^(data:)/, "");
  try {
    const decoded = JSON.parse(strippedTextValue);
    console.log({ decoded });
    return { data: decoded };
  } catch (e) {
    throw Error("Data is not a valid JSON");
  }
}

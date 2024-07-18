interface DepListData {
  _id: string;
  departmentName: string;
}

const depListConvert = (inputData: DepListData[]) => {
  const convertedData = inputData.map((data) => {
    return {
      value: data._id,
      key: data.departmentName,
    };
  });
  return convertedData;
};

function truncateText(text: string, limit: number) {
  if (text.length > limit) {
    return text.substring(0, limit) + " ...";
  } else {
    return text;
  }
}

function convertDateTimeToDate(DateTime: any) {
  const dateObject = new Date(DateTime);

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = dateObject.getFullYear();

  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedDateTime;
}

function getMonth(DateTimeString: string) {
  const date = new Date(DateTimeString);
  return date.getMonth() + 1;
}

function truncateHTML(html: string, length: number) {
  let div = document.createElement("div");
  div.innerHTML = html;
  let truncated = "";
  let totalLength = 0;

  function traverseNodes(node: any) {
    if (totalLength >= length) return;

    if (node.nodeType === Node.TEXT_NODE) {
      let remainingLength = length - totalLength;
      if (node.nodeValue.length <= remainingLength) {
        truncated += node.nodeValue;
        totalLength += node.nodeValue.length;
      } else {
        truncated += node.nodeValue.substring(0, remainingLength);
        totalLength = length;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      let innerHTML = "";
      for (let i = 0; i < node.childNodes.length; i++) {
        if (totalLength < length) {
          traverseNodes(node.childNodes[i]);
        }
      }
      truncated += `<${node.nodeName.toLowerCase()}>${innerHTML}</${node.nodeName.toLowerCase()}>`;
    }
  }

  for (let i = 0; i < div.childNodes.length; i++) {
    if (totalLength < length) {
      traverseNodes(div.childNodes[i]);
    }
  }

  return truncated;
}

export {
  convertDateTimeToDate,
  depListConvert,
  getMonth,
  truncateText,
  truncateHTML,
};

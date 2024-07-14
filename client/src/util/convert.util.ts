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
    return text.substring(0, limit) + ' ...';
  } else {
    return text;
  }
}

function convertDateTimeToDate(DateTime: any) {
  const dateObject = new Date(DateTime);

  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');

  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = dateObject.getFullYear();

  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedDateTime;
}

function getMonth(DateTimeString: string) {
  const date = new Date(DateTimeString);
  return date.getMonth() + 1;
}

export { convertDateTimeToDate, depListConvert, getMonth, truncateText };


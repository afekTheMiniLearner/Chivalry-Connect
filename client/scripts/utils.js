async function postData(url, data) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response;
    })
    .catch((e) => console.error(e));
}

async function getData(url) {
  const accessToken = localStorage.getItem('jwtAccessToken');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const fetchedData = await fetch(url, {
    method: 'GET',
    headers,
  })
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response;
    })
    .catch((e) => console.error(e));

  return fetchedData;
}

function soundEffect(name) {
  new Audio(`../assets/sounds/${name}.mp3`).play();
}

async function isAuthenticatedUser() {
  const accessToken = localStorage.getItem('jwtAccessToken');

  let isAuth = false;
  if (accessToken) {
    isAuth = await getData('/auth/user-authenticated')
      .then((d) => {
        if (!d) throw Error('Token is not verified/it is expired');
        return true;
      })
      .catch(() => false);
  }

  return isAuth;
}

function addLineBreaksToText(text, lineBreaksCount = 1) {
  const lineBreaks = '\n'.repeat(lineBreaksCount);
  const punctuations = /[.!?]/g;
  const textWithLineBreaks = text?.replaceAll(punctuations, `$& ${lineBreaks}`);
  let result = textWithLineBreaks;

  const isEndsWithLineBreaks = textWithLineBreaks?.endsWith('\n');
  if (isEndsWithLineBreaks) {
    const subStrEndIndex = textWithLineBreaks.length - lineBreaksCount - 1;
    result = textWithLineBreaks.substring(0, subStrEndIndex);
  }

  return result;
}

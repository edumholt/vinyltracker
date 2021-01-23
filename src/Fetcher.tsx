import React from 'react';

export const Fetcher: React.FC = () => {
  async function getData(url: string) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'wjBtSUMIJHFmXigLIORbkuvZUHyvPItndRSjLXlE',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return response.json();
  }

  getData('https://api.discogs.com/users/edumholt/collection/folders/0/releases').then((data) => {
    data.releases.forEach((release: any) => {
      console.log(release.basic_information);
    });
  });

  return <h1>VinylTracker</h1>;
};

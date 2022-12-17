export function fetchCountries(name) {
    const filter = '?fields=name,capital,population,flags,languages';
    return fetch(
        `https://restcountries.com/v2/name/${name}${filter}`
      ).then((response) => {
        if (!response.ok) {
           Notify.failure('Oops, there is no country with that name');
      throw new Error(response.status);
      
    }
    return response.json();
  });
}
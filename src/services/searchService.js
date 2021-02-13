export function SearchResult(Data, searchWord) {
    const data = [...Data];
    const results = data.filter(person => person["Title"].toLowerCase().includes(searchWord));
    return results
}
export function sortby_date(Data) {
    let data = [];
    data = [...Data];

    data.sort(function (a, b) {
        return new Date(b["Release Date"]) - new Date(a["Release Date"]);
    });
    return data

}
export function sortby_genre(Data) {
    let data = [...Data];
    for (let i = 0; i < data.length; i++) {
        if (data[i]["Major Genre"] === null) {
            data[i]["Major Genre"] = "none"
        }
    }
    data.sort(function (a, b) {
        return (a["Major Genre"] < b["Major Genre"]) ? -1 : 1;
    })
    return data
}
export function sortby_title(Data) {
    let data = [...Data];
    data.sort(function (a, b) {
        return (a["Title"] < b["Title"]) ? -1 : 1;
    })
    return data
}
export function sortby_director(Data) {
    let data = [...Data];
    for (let i = 0; i < data.length; i++) {
        if (data[i]["Director"] === null) {
            data[i]["Director"] = "none"
        }
    }
    data.sort(function (a, b) {
        return (a["Director"] < b["Director"]) ? -1 : 1;
    })
    return data
}
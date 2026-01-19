const firstTest = [1, 2, 3, 4, 5, 6, "Lê Văn A", "Nguyễn Thị B", "Đỗ Thị C"]
const secondTest = [10, 20, 30, 40, 50, 60]
const thirdTest = [1, 2, 4, 6, 8, 10, 3, 5, 7, 9]
let search = document.querySelector(".search")
let pageNumber = ""
let fullData = ""
let pages = 1
let currentPage = 1
function throwError(message) {
    throw new Error(message)
}
function consoleLog(element) {
    console.log(element)
}
function consoleLog2(element1, element2) {
    console.log(element1 + element2)
}
function forEachTest(array, callback) {
    for (element of array) {
        callback(element)
    }
}

function forEachPair(array, callback) {
    for (let i = 0; i < array.length - 1; i++) {
        callback(array[i], array[i + 1])
    }
}
const random = new Promise((resolve, reject) => {
    let randomInt = Math.floor(Math.random() * 10)
    if (randomInt == undefined) {
        reject("Lỗi: Không thể tạo số ngẫu nhiên.")
    } else {
        resolve(`Số ngẫu nhiên: ${randomInt}`)
    }
})
const filterEven = new Promise((resolve, reject) => {
    let evenArray = thirdTest.filter(x => x % 2 == 0)
    if (evenArray.length > 0) {
        resolve(evenArray)
    } else {
        reject("Lỗi: Không tìm thấy số chẵn.")
    }
})
random.then((result) => {
        consoleLog(result)
    }).catch((e) => {
        throwError(e)
    })
filterEven.then((result) => {
    consoleLog(result)
    }).catch((e) => {
        throwError(e)
    })
forEachTest(firstTest, consoleLog)
forEachPair(secondTest, consoleLog2)

async function flagData() {
    try {
        const API = await fetch('https://open.oapi.vn/location/countries')
        if (!API.ok) {
        throw new Error(`HTTP error! status: ${API.status}`);
        }
        const { data } = await API.json();
        fullData = data
        pagination(fullData, 20)
        createFlagDisplay(fullData, 0, 20)
    }
    catch (error) {
        console.error(error);
    }
}
function createFlagDisplay(data, from, to) {
    let string = ""
    const container = document.querySelector(".container")
    if (data.length == 0) {
        string = 
        `
        <div class="flagContainer">
            Sorry... We couldn't find anything
        </div>
        `
        container.innerHTML = string
        return
    }
    for (let i = from; i < Math.min(to, data.length); i++) {
        string += 
        `
        <div class="flagContainer">
            <img src="${data[i].flag}" loading="lazy" onerror="placeholderImage(this)">
            ${ data[i].name }
        </div>
        `
    }
    container.innerHTML = string
}
flagData()

async function getIP() {
    try {
        const API = await fetch("https://api.ipify.org/?format=json")
        if (API == "") { throw new Error("No response from API endpoint")}
        const { ip } = await API.json()
        const IPC = document.querySelector(".IP")
        IPC.textContent = `Your IP is ${ ip }`
    }
    catch (e) {
        console.error(error);
    }
}
getIP()
function placeholderImage(image) {
    if (image.src != "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png") {
        image.src = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    }
}
let pagesContainer = document.querySelectorAll(".pages")
let initialize = false
function pagination(data, limit) {
    pages = Math.ceil(data.length / limit)
    pagesContainer.forEach((element) => {
        element.innerHTML = `Page <input type="number" min="1" max="${pages}" value="1" class="numberPage"> out of ${pages}`
    })
}
function next() {
    if (currentPage + 1 > pages) {
        return
    } else {
        currentPage++
        createFlagDisplay(fullData, 20 * (currentPage - 1), 20 * currentPage)
        pagesContainer.forEach((element) => {
            element.innerHTML = `Page <input type="number" min="1" max="${pages}" value="${currentPage}" class="numberPage"> out of ${pages}`
        })
    }
}
function prev() {
    if (currentPage - 1 < 1) {
        return
    } else {
        currentPage--
        createFlagDisplay(fullData, 20 * (currentPage - 1), 20 * currentPage)
        pagesContainer.forEach((element) => {
            element.innerHTML = `Page <input type="number" min="1" max="${pages}" value="${currentPage}" class="numberPage"> out of ${pages}`
        })
    }
}
let x = ""
search.addEventListener("input", () => {
    let filteredData = fullData.filter(element => new RegExp(`^${search.value.toLocaleLowerCase()}`).test(element.name.toLocaleLowerCase()))
    currentPage = 1
    x = filteredData
    pagination(filteredData, 20)
    createFlagDisplay(filteredData, 20 * (currentPage - 1), 20 * currentPage)
})
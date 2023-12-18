let raw_materials
let stoves

window.onload = onLoad()

function onLoad() {
    get_elements().then(JSON.parse).then(function (response) {
        console.log("Ура, JSON!", response)
        return response
    }).then(function (response) {
        create_input_elements(response)
    })

    create_menu_elements()
}

// async function get_calculate(data) {
//     return await eel.get_calculate()();
// }




async function get_elements() {
    return await eel.get_elements()()
}


async function getRawMaterials() {
    return await eel.get_raw_materials()()
}

function create_input_elements(elements) {
    let input_blocks = ""

    for (let element in elements) {
        input_blocks += `<div className="input-group mb-3">
                            <span className = "input-group-text" id = "basic-addon1" > ${element}</span>
                            <input type="text" className="form-control" placeholder="0.00" aria-label="Username" aria-describedby="basic-addon1">
                         </div>`
    }

    document.getElementById('input-block').innerHTML = input_blocks
}

function create_menu_elements() {
    document.getElementById('menu-block').innerHTML = `
    <li><a href="index.html">Конечный состав</a></li>
    <li><a href="raw_materials.html">Исходные материалы</a></li>
    <li><a href="additives.html">Легирующие элементы</a></li>
    <li><a href="stoves.html">Метод плавления</a></li>
    `
}
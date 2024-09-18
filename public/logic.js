document.getElementById('apellidos').addEventListener('keypress',(event)=>{
    if(!(/[a-zA-Z\s ]/.test(event.key))){
        event.preventDefault()
    }
}) 
document.getElementById('nombres').addEventListener('keypress',(event)=>{
    if(!(/[a-zA-Z\s ]/.test(event.key))){
        event.preventDefault()
    }
}) 
const xhr = new XMLHttpRequest();
xhr.open("GET","/data/towns.json",true);

const xhr2 = new XMLHttpRequest();
xhr2.open("GET","/data/departments.json",true);

xhr2.onreadystatechange = ()=>{
    if(xhr2.readyState === 4){
      const deparments = JSON.parse( xhr2.responseText)
      selectDepartments(deparments);
  }}
xhr.onreadystatechange = ()=>{
  if( xhr.readyState === 4 ){
    const towns = JSON.parse( xhr.responseText)
    selectTowns(towns);
}}
xhr.send()
xhr2.send()

var departamento =[];

  function selectDepartments(data){
    var selec = document.getElementById('departamento');
    data.forEach((city)=>{
        if(!departamento.includes(city.code)){
            departamento.push(city.code);
            var option=document.createElement('option');
            option.value=city.code;
            option.textContent=city.name;
            selec.appendChild(option);
        }
    })
  }

  var municipio = [];

function selectTowns(data) {
  var departamentoSelect = document.getElementById('departamento');
  var municipioSelect = document.getElementById('municipio');
  departamentoSelect.addEventListener('change', function() {
    var departamentoSeleccionado = departamentoSelect.value;
    municipioSelect.innerHTML = '<option value="">Seleccione un Municipio</option>';
    data.forEach((town) => {
      if (town.department === departamentoSeleccionado) {
        if (!municipio.includes(town.code)) {
          municipio.push(town.code);
          var option = document.createElement('option');
          option.value = town.name;
          option.textContent = town.name;
          municipioSelect.appendChild(option);
        }
      }
    });
  });
}


const empleados = [];
let ultimoId = 0; 
document.getElementById('formularioEmpleado').addEventListener('submit', agregarEmpleado);

function agregarEmpleado(event) {
    event.preventDefault();
    const apellidos = document.getElementById('apellidos').value;
    const nombres = document.getElementById('nombres').value;
    const departamento = document.getElementById('departamento');
    const municipio = document.getElementById('municipio').value;

    const departamentoNombre = departamento.options[departamento.selectedIndex].text;

    ultimoId += 1;
    const empleado = {
        id: ultimoId,
        apellidos,
        nombres,
        departamento: departamentoNombre,
        ciudad: municipio
    };
    empleados.push(empleado);

    const body = document.getElementById('tablaEmpleados');
    const row = document.createElement('tr')

    const colId = document.createElement('td')
    colId.appendChild( document.createTextNode(ultimoId))
    row.appendChild(colId)

    const colName = document.createElement('td');
    colName.appendChild(document.createTextNode(nombres+" "+apellidos));
    row.appendChild(colName)

    const colDepartment = document.createElement('td');
    colDepartment.appendChild(document.createTextNode(departamentoNombre));
    row.appendChild(colDepartment)

    const colCity = document.createElement('td');
    colCity.appendChild(document.createTextNode(municipio));
    row.appendChild(colCity)

    body.appendChild(row)
    event.target.reset();
}


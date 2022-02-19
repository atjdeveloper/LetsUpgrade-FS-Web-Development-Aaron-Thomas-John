

let users= [
	{
		name: "Jacob Hayes",
        age:22,
		postalZip: 2932938,
		country: "Spain",
        company:{
            name:"TCS",
            role:".Net Developer",
            salary: 400000
        }
	},
	{
		name: "Alyssa Hendrix",
		age:26,
		postalZip: 690938,
		country: "India",
        company:{
            name:"Wipro",
            role:"C Developer",
            salary: 350000
        }
	},
	{
		name: "Aora King",
		age:44,
		postalZip: 794032,
		country: "China",
        company:{
            name:"Wipro",
            role:"Java Developer",
            salary: 600000
        }
	},
	{
		name: "Lucas Miranda",
		age:32,
		postalZip: 2911893,
		country: "USA",
        company:{
            name:"Infosys",
            role:"Software Developer",
            salary: 1200000
        }
	},
	{
		name: "Jeanette Patel",
		age:27,
		postalZip: 17817102,
		country: "London",
        company:{
            name:"Capegmini",
            role:"Java Developer",
            salary: 450000
        }
	},
    {
		name: "Paulson David",
		age:30,
		postalZip: 6949893,
		country: "Scotland",
        company:{
            name:"Royal Bank of Scotland",
            role:"C Developer",
            salary: 2200000
        }
	},
    {
		name: "Samson Paul",
		age:35,
		postalZip: 4546466,
		country: "Ukraine",
        company:{
            name:"Ahla Hospital",
            role:"Software Developer",
            salary: 3000000
        }
	}
]

usersDisplay=users;

function displayData(data){
    let rows = "";

    for(let i=0;i<data.length;i++){

       rows+= `
                <tr>
                  <td>${data[i].name}</td>
                  <td>${data[i].age}</td>
                  <td>${data[i].company.name}</td>
                  <td>${data[i].company.role}</td>
                  <td>${data[i].country}</td>
                  <td>${data[i].company.salary}</td>
                </tr>
       
              `

    }

    document.getElementById('tbody').innerHTML = rows;
}

displayData(users);


let filters={
    nameFilter:{
        status:false,
        value:""
    },
    companyNameFilter:{
        status:false,
        value:""
    },
    companyRoleFilter:{
        status:false,
        value:""
    },
    ageFilter:{
        status:false,
        value:""
    }
};

function searchName(value,property,data){
    let results = [];
    for( let i=0;i<data.length;i++){
        if(data[i][property].toLowerCase().indexOf(value.toLowerCase())==0){
            results.push(data[i]);
        }
    }
   return results;
}


function searchCompany(value,property,data){
    let companyName= [];
    for(let i=0;i<data.length;i++){
        if(data[i].company[property].toLowerCase().indexOf(value.toLowerCase())==0){
            companyName.push(data[i]);
        }
    }

    return companyName;
}

function sortData(data,way){
    data.sort(function(a,b){
        if(way==='asc'){
            return a.age - b.age;
        }else if(way==='desc'){
            return b.age-a.age;
        }
    })
    return data;
}

function searchFilter(searchValue,propertyFilter){
    let usersDisplay = Object.create(users);
    if(searchValue!==""){
        filters[propertyFilter].status= true;
        filters[propertyFilter].value= searchValue;
    }else{
        filters[propertyFilter].status= false;
        filters[propertyFilter].value="";
    }

    if(filters.nameFilter.status===true){
        usersDisplay = searchName(filters.nameFilter.value,'name',usersDisplay);
    }
    if(filters.companyNameFilter.status===true){
        usersDisplay = searchCompany(filters.companyNameFilter.value,'name',usersDisplay);
    }
    if(filters.companyRoleFilter.status===true){
        usersDisplay = searchCompany(filters.companyRoleFilter.value,'role',usersDisplay);
    }
    if(filters.ageFilter.status===true){
        usersDisplay = sortData(usersDisplay,filters.ageFilter.value);
    }
    displayData(usersDisplay);
}


export const directions = {
    auto: {
      icon: 'rowfield',
      shading: true,
      position: {
        of: '#grid',
        my: 'right bottom',
        at: 'right bottom',
        offset: '-16 -16',
      },
    },
    up: {
      icon: 'rowfield',
      shading: true,
      direction: 'up',
      position: {
        of: '#grid',
        my: 'right bottom',
        at: 'right bottom',
        offset: '-16 -16',
      },
    },
    down: {
      icon: 'rowfield',
      shading: true,
      direction: 'down',
      position: {
        of: '.dx-datagrid-rowsview',
        my: 'right top',
        at: 'right top',
        offset: '-16 16',
      },
    },
  };
  
  //! MACHINES 
  export const machines = [{
    "id": 3,
    "name": "Leonardino",
    "ip": "192.0.2.142",
    "port": 1880,
    "year": 2019,
    "notes": "Ha una nuova macchia sul lato destro",
    "kWh_consumption": 23,
    "length": 40,
    "width": 30,
    "depth": 50,
    "max_tests": 2,
    "TestId": null,
    "TestTypes": [1, 2],
  }, {
    "id": 2,
    "name": "Buzuluk",
    "ip": "192.0.2.146",
    "port": 1880,
    "year": 2020,
    "kWh_consumption": null,
    "length": null,
    "width": null,
    "depth": null,
    "max_tests": null,
    "TestId": null,
    "TestTypes": [3],
  }, {
    "id": 1,
    "name": "tesla",
    "ip": "192.0.2.128",
    "port": 1881,
    "year": 2017,
    "kWh_consumption": 48,
    "length": 90,
    "width": 50,
    "depth": 42,
    "max_tests": 1,
    "TestId": null,
    "TestTypes": [2,3],
  }];
  
  //! TEST TYPES
  export const testTypes = [{
    "id": 1,
    "name": "Belt durability",
    "outdoor": false, 
    "createdBy": 1,
    "enabled": true,
    "description": "questo test è per verificare la durabilità della cinta"
  }, {
    "id": 2,
    "name": "Endurance",
    "outdoor": false,
    "createdBy": 2,
    "enabled": true,
    "description": "calcolare la durata di uno spintone"

  }, {
    "id": 3,
    "name": "Belt speed",
    "outdoor": false, 
    "createdBy": 2,
    "enabled": true,
    "description": "questo test serve a studiare la velocità della cinta"

  }];
  
  //! RIMS 
  export const rim = [{
    "id": 1,
    "name": "DW18L",
    "diameter": 18,
    "width": 2,
    "rim_color": "Black",
  }, {
    "id": 2,
    "name": "DW20L",
    "diameter": 20,
    "width": 2,
    "rim_color": "Black",
  }, {
    "id": 3,
    "name": "DW22L",
    "diameter": 22,
  
    "width": 2,
    "rim_color": "Black",
  }, {
    "id": 4,
    "name": "DW24L",
    "diameter": 24, 
    "width": 2,
    "rim_color": "Black",
  }];
  
  //! SIZE 
  export const tubeType = [{
    "id": 1,
    "name": "Tubeless",
  }, {
    "id": 2,
    "name": "Tube Type",
  }
  ];
  
  export const structure = [{
    "id": 1,
    "name": "R",
  }, {
    "id": 2,
    "name": "B",
  }, {
    "id": 3,
    "name": "G",
  }
  ];
  
  export const ECE = [{
    "id": 1,
    "name": "ECE1",
  }, {
    "id": 2,
    "name": "ECE2",
  }];
  
  export const radialCrossPly = [{
    "id": 1,
    "name": "Radial Cross Ply",
  }, {
    "id": 2,
    "name": "Brut Cross Ply",
  }];
  
  export const size = [
    {
    "id": 1,
    "identifier": "3000/50R80 TL",
    "aspectRatio": 50,
    "sectionWidth": 3000,
    "rimWidth": 52,
    "pressure": 5,  
    "rimFitting": 80,
    "Structure": (1),
    "Rim": (1),
    "TubeType": (1),
    "LI": 585,
    "LI2": 590,
    "SI": "D",
    "SI2": "E",
    "RC": "",
    "ECE": (2),
    "weight": 3020,
    "RadialCrossPly": (2),
    "notes": "lore ipsum",  
    "load": 10300,
    "diameter": 225,
    }, 
    {
    "id": 2,
    "identifier": "2500/60R80 TL",
    "aspectRatio": 60,
    "sectionWidth": 2500,
    "rimWidth": 52,
    "pressure": 5,  
    "rimFitting": 80,
    "Structure": (2),
    "Rim": (2),
    "TubeType": (2),
    "LI": 585,
    "LI2": 590,
    "SI": "D",
    "SI2": "E",
    "RC": "",
    "ECE": (2),
    "weight": 3020,
    "RadialCrossPly": (1),
    "notes": "lore ipsum",  
    "load": 10300,
    "diameter": 225,
    },
    {
    "id": 3,
    "identifier": "4000/70R90 TL",
    "aspectRatio": 70,
    "sectionWidth": 4000,
    "rimWidth": 52,
    "pressure": 5,  
    "rimFitting": 90,
    "Structure": (2),
    "Rim": (1),
    "TubeType": (2),
    "LI": 585,
    "LI2": 590,
    "SI": "D",
    "SI2": "E",
    "RC": "",
    "ECE": (1),
    "weight": 3020,
    "RadialCrossPly": (1),
    "notes": "lore ipsum",  
    "load": 10300,
    "diameter": 225,
    },
    
  ];
  
  export const treadType = [{
    "id": 1,
    "name": "R-1W",
  }, {
    "id": 2,
    "name": "R-2W",
  }, {
    "id": 3,
    "name": "R-3W",
  } ];
  
  export const rimType = [{
    "id": 1,
    "name": "DW18L",
    "well": "DW",
    "L": 18,
    "R": 2,
    "fori": 10,
    "offset": 0,
    "doppiavalvola": true,
    "tipoRinforzo": "esempio",
    "modifiche": "esempio modifiche",
    "kg": 221,
    "Companies": 1,
    "colore": "rosso",
    "scritte": "esempio scritte"
  }, {
    "id": 2,
    "name": "DW20L",
    "well": "DW",
    "L": 20,
    "R": 2,
    "fori": 10,
    "offset": 0,
    "doppiavalvola": false,
    "tipoRinforzo": "esempio",
    "modifiche": "esempio modifiche",
    "kg": 221,
    "Companies":3,
    "colore": "rosso",
    "scritte": "esempio scritte"
  }, {
    "id": 3,
    "name": "DW22L",
    "well": "DW",
    "L": 22,
    "R": 2,
    "fori": 10,
    "offset": 0,
    "doppiavalvola": true,
    "tipoRinforzo": "esempio",
    "modifiche": "esempio modifiche",
    "kg": 221,
    "Companies": 2,
    "colore": "rosso",
    "scritte": "esempio scritte"
  
  } ];
  
  //! TIRE 
  
  export const tireIdType = [{
    "id": 1,
    "name": "Claimed",
    "value": "R",
  }, {
    "id": 2,
    "name": "Competitor ",
    "value": "C",
  },
  {
    "id": 3,
    "name": "MPF",
    "value": "N",
  
  }, {
    "id": 4,
    "name": "Other Requests",
    "value": "P",
  }, {
    "id": 5,
    "name": "Process Requests",
    "value": "P",
  }];
  
  export const tire = [{
    "IDName": "R-1W QWERTY",
    "id": 1,
    "Companies": 2,
    "specificationCode": "Long esempio text",
    "characteristics": "Long esempio text",
    "Size": 2,
    "TyreIdType": 1,
  },
  {
    "IDName": "R-1W QWERTY",
    "id": 2,
    "Companies": 3,
    "specificationCode": "Long esempio text",
    "characteristics": "Long esempio text",
    "Size": 2,
    "TyreIdType": 3,
  },
  {
    "IDName": "R-1W QWERTY",
    "id": 3,
    "Companies": 1,
    "specificationCode": "Long esempio text",
    "characteristics": "Long esempio text",
    "Size": 3,
    "TyreIdType": 4,
  },
  ];
  
  //! TEST 
  export const tests = [{
    "id": 1,
    "CompanyId": (1),
    "TestTypes": (1),
    "Machines": (1), 
    "Person": (1),
    "date": "2019-12-12",
    "Tools": (1,2),
    }
  ];
  
  //! TOOLS 
  export const tools = [{
    "id": 1,
    "name": "cacciavite blu",
    "Wharehouse": (1),
    "quantity": 1
  }, {
    "id": 2,
    "name": "pezzo di ferro",
    "Wharehouse": (1),
    "quantity": 1
  }];
  
  //! WHAREHOUSE 
  export const wharehouse = [{
    "id": 1,
    "name": "Magazzino A",
  }, {
    "id": 2,
    "name": "Magazzino B",
  }];
  
  //! LOGS 
  export const logs = [{
    id: 1,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine starts working', 
  }, {
    id: 2,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine stops working',
  }, 
  {
    id: 3,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine starts working',
  }, {
    id: 4,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine stops working',
  },
  {
    id: 5,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine starts working',
  }, {
    id: 6,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine stops working',
  },
  {
    id: 7,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine starts working',
  }, {
    id: 8,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine stops working',
  }, {
    id: 9,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine starts working',
  }, {
    id: 10,
    dateandtime: '2011-07-14 19:43:37 ',
    message: 'machine stops working',
  }
  
    
  ];
  
  //! COMPANIES 
  export const companies = [{
    "id": 1,
    "name": "Tesla",
    "addressId": "Tesla street",
    "adressNumber": "1",
    "zipCode": "00134",
    "CityId": (1),
    "StateId": (1),
    "CountryName": (1),
    "phone": "123456789",
    "email": "tesla@gmail.com",
    "VAT": "123456789",
    "fiscalCode": "123456789",
    "SAP": "123456789"     
  },
  {
    "id": 2,
    "name": "Apple",
    "addressId": "Apple street",
    "adressNumber": "1",
    "zipCode": "00134",
    "CityId": (8),
    "StateId": (3),
    "CountryName": (5),
    "phone": "123456789",
    "email": "apple@gmail.com",
    "VAT": "123456789",
    "fiscalCode": "123456789",
    "SAP": "123456789"
  },
  {
    "id": 3,
    "name": "Google",
    "addressId": "Google street",
    "adressNumber": "1",
    "zipCode": "00134",
    "CityId": (3),
    "StateId": (6),
    "CountryName": (4),
    "phone": "123456789",
    "email": "google@gmail.com", 
    "VAT": "123456789",
    "fiscalCode": "123456789",
    "SAP": "123456789"
  }
  ];
  
  //! STATE 
  export const states = [{
    id: 1,
    name: 'Alabama',
  }, {
    id: 2,
    name: 'Alaska',
  }, {
    id: 3,
    name: 'Arizona',
  }, {
    id: 4,
    name: 'Arkansas',
  }, {
    id: 5,
    name: 'California',
  }, {
    id: 6,
    name: 'Colorado',
  }, {
    id: 7,
    name: 'Connecticut',
  }, {
    id: 8,
    name: 'Delaware',
  }, {
    id: 9,
    name: 'District of Columbia',
  }, {
    id: 10,
    name: 'Florida',
  }, {
    id: 11,
    name: 'Georgia',
  }, {
    id: 12,
    name: 'Hawaii',
  }, {
    id: 13,
    name: 'Idaho',
  }, {
    id: 14,
    name: 'Illinois',
  }, {
    id: 15,
    name: 'Indiana',
  }];
  
  //! COUNTIES 
  export const countries = [{
    id: 1,
    name: 'United States',
  }, {
    id: 2,
    name: 'Canada',
  }, {
    id: 3,
    name: 'Mexico',
  }, {
    id: 4,
    name: 'United Kingdom',
  }, {
    id: 5,
    name: 'France',
  }, {
    id: 6,
    name: 'Germany',
  }];
  
  //! CITY 
  export const city = [{
    id: 1,
    name: 'New York',
  }, {
    id: 2,
    name: 'Los Angeles',
  }, {
    id: 3,
    name: 'Chicago',
  }, {
    id: 4,
    name: 'Houston',
  }, {
    id: 5,
    name: 'Philadelphia',
  }, {
    id: 6,
    name: 'Phoenix',
  }, {
    id: 7,
    name: 'San Antonio',
  }, {
    id: 8,
    name: 'San Diego',
  }, {
    id: 9,
    name: 'Dallas',
  }, {
    id: 10,
    name: 'San Jose',
  }];
  
  //! PERSON 
  export const person = [{
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "jhon@gmail.com",      
      "Companies": (1),
      "Role": (1),
      },
      {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "Jane@gmail.com",
      "Companies": (2),
      },
      {
      "id": 3,
      "firstName": "John",
      "lastName": "Doe",
      "email": "Doe@gmail.com", 
      "Companies": (3),
      }];
  
  //! ROLE 
  export const roles = [{
    id: 1,
    name: 'Administrator',
  }, {
    id: 2,
    name: 'Operator',
  }, {
    id: 3,
    name: 'Technician',
  }];
  
  //! TASKS
  export const tasks = [{
    "id": 1,
    "name": "Task 1",
    "description": "Task 1 description",
    "startDate": "2011-07-14 19:43:37",
    "endDate": "2011-07-14 19:43:37",
    "status": "In progress",
    "priority": "High",
    "assignedTo": (1),
    "assignedBy": (1)
  },
  {
    "id": 2,
    "name": "Task 2",
    "description": "Task 2 description",
    "startDate": "2011-07-14 19:43:37",
    "endDate": "2011-07-14 19:43:37",
    "status": "In progress",
    "priority": "High",
    "assignedTo": (2),
    "assignedBy": (1)
  }
  ];
  
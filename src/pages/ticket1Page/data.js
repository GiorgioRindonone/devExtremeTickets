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
  
  export const machines = [{
    "id": 3,
    "name": "leonardino",
    "ip": "192.0.2.142",
    "port": 1880,
    "year": 2019,
    "kWh_consumption": 23,
    "length": 40,
    "width": 30,
    "depth": 50,
    "max_tests": 2,
    "TestId": null,
    "TestTypes": [{
        "name": "Endurance",
        "outdoor": false,
        "TestId": null,
        "MachineTestType": {
            "TestTypeName": "Endurance",
            "MachineId": 3
        }
    }]
  }, {
    "id": 2,
    "name": "buzuluk",
    "ip": "192.0.2.146",
    "port": 1880,
    "year": 2020,
    "kWh_consumption": null,
    "length": null,
    "width": null,
    "depth": null,
    "max_tests": null,
    "TestId": null,
    "TestTypes": [{
        "id": 3,  
        "name": "Belt speed",
        "outdoor": false 
    }]
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
    "TestTypes": [{
        "id": 1,
        "name": "Belt durability",
        "outdoor": false,
        "TestId": null,
        "MachineTestType": {
            "TestTypeName": "Belt durability",
            "MachineId": 1
        }
    }, {
        "id": 2,
        "name": "Endurance",
        "outdoor": false,
        "TestId": null,
        "MachineTestType": {
            "TestTypeName": "Endurance",
            "MachineId": 1
        }
    }]
  }];
  
  export const testTypes = [{
    "id": 1,
    "name": "Belt durability",
    "outdoor": false
  }, {
    "id": 2,
    "name": "Endurance",
    "outdoor": false
  }, {
    "id": 3,
    "name": "Belt speed",
    "outdoor": false
  }];
  
  
  export const tests = [{
    "id": 1,
    "CompanyId": {
        "id": 1,
        "name": "Tesla",
        "AddressId": {
            "id": 1,
            "street": "Tesla street",
            "number": "1",
            "CityId": {
                "id": 1,
                "name": "New York",
                "StateId": {
                    "id": 1,
                    "name": "New York",
                    "CountryName": "USA"
                }
            },
        },
        "phone": "123456789",
        "email": "tesla@gmail.com",
        "VAT": "123456789",
        "fiscalCode": "123456789",
        "SAP": "123456789"      
    },
    "TestTypeName": "Belt durability",
    "MachineId": {
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
      "TestTypes": [{
        "name": "Belt durability",
        "outdoor": false,
        "TestId": null,
        "MachineTestType": {
          "TestTypeName": "Belt durability",
          "MachineId": 1
        }
    }, {
      "name": "Endurance",
      "outdoor": false,
      "TestId": null,
      "MachineTestType": {
        "TestTypeName": "Endurance",
        "MachineId": 1
      }
    }]
    },
    "PersonId": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "jhon@gmail.com",      
      "CompanyId": {
        "id": 1,
        "name": "Tesla",
        "AddressId": {
            "id": 1,
            "street": "Tesla street",
            "number": "1",
            "CityId": {
                "id": 1,
                "name": "New York",
                "StateId": {
                    "id": 1,
                    "name": "New York",
                    "CountryName": "USA"
                }
            },
        },
      }
    },
    "date": "2019-12-12",
    "Tools": [
      { "name": "cacciavite blu", 
        "Wharehouse": "magazzino1",
        "quantity": 1
      },
      { "name": "pezzo di ferro", 
        "Wharehouse": "magazzino1",
        "quantity": 1
      }
    ],
  
    }
  ];
  
  export const states = [{
    ID: 1,
    Name: 'Alabama',
  }, {
    ID: 2,
    Name: 'Alaska',
  }, {
    ID: 3,
    Name: 'Arizona',
  }, {
    ID: 4,
    Name: 'Arkansas',
  }, {
    ID: 5,
    Name: 'California',
  }, {
    ID: 6,
    Name: 'Colorado',
  }, {
    ID: 7,
    Name: 'Connecticut',
  }, {
    ID: 8,
    Name: 'Delaware',
  }, {
    ID: 9,
    Name: 'District of Columbia',
  }, {
    ID: 10,
    Name: 'Florida',
  }, {
    ID: 11,
    Name: 'Georgia',
  }, {
    ID: 12,
    Name: 'Hawaii',
  }, {
    ID: 13,
    Name: 'Idaho',
  }, {
    ID: 14,
    Name: 'Illinois',
  }, {
    ID: 15,
    Name: 'Indiana',
  }, {
    ID: 16,
    Name: 'Iowa',
  }, {
    ID: 17,
    Name: 'Kansas',
  }, {
    ID: 18,
    Name: 'Kentucky',
  }, {
    ID: 19,
    Name: 'Louisiana',
  }, {
    ID: 20,
    Name: 'Maine',
  }, {
    ID: 21,
    Name: 'Maryland',
  }, {
    ID: 22,
    Name: 'Massachusetts',
  }, {
    ID: 23,
    Name: 'Michigan',
  }, {
    ID: 24,
    Name: 'Minnesota',
  }, {
    ID: 25,
    Name: 'Mississippi',
  }, {
    ID: 26,
    Name: 'Missouri',
  }, {
    ID: 27,
    Name: 'Montana',
  }, {
    ID: 28,
    Name: 'Nebraska',
  }, {
    ID: 29,
    Name: 'Nevada',
  }, {
    ID: 30,
    Name: 'New Hampshire',
  }, {
    ID: 31,
    Name: 'New Jersey',
  }, {
    ID: 32,
    Name: 'New Mexico',
  }, {
    ID: 33,
    Name: 'New York',
  }, {
    ID: 34,
    Name: 'North Carolina',
  }, {
    ID: 35,
    Name: 'Ohio',
  }, {
    ID: 36,
    Name: 'Oklahoma',
  }, {
    ID: 37,
    Name: 'Oregon',
  }, {
    ID: 38,
    Name: 'Pennsylvania',
  }, {
    ID: 39,
    Name: 'Rhode Island',
  }, {
    ID: 40,
    Name: 'South Carolina',
  }, {
    ID: 41,
    Name: 'South Dakota',
  }, {
    ID: 42,
    Name: 'Tennessee',
  }, {
    ID: 43,
    Name: 'Texas',
  }, {
    ID: 44,
    Name: 'Utah',
  }, {
    ID: 45,
    Name: 'Vermont',
  }, {
    ID: 46,
    Name: 'Virginia',
  }, {
    ID: 47,
    Name: 'Washington',
  }, {
    ID: 48,
    Name: 'West Virginia',
  }, {
    ID: 49,
    Name: 'Wisconsin',
  }, {
    ID: 50,
    Name: 'Wyoming',
  }, {
    ID: 51,
    Name: 'North Dakota',
  }];
  
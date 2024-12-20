const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
const TyreSchemea = require("../model/TyreSchemea");
const VechicleSchmea = require("../model/VechicleSchmea");

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-002",
    systemInstruction: "you are the Tyre maintance Suggestion Bot for Dum trucks , From the given Data , give Tyre Helath Index ,  give 3 Suggestion Based on the data (pressure and payload releated data only  not thread depth ,  avoid tyres with 0 psi it means not available  )",
  });
  
  const generationConfig = {
    temperature: 1.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function runLLM(req,res) {
      console.log(apiKey)
      const vehicle_id = req.params.truckId

      const truckData = await VechicleSchmea.findOne({vehicle_id:vehicle_id})
      const tyreData = await TyreSchemea.find({vehicle_id:vehicle_id})

      const data = {
          truckData,
          tyreData
      }

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "{\n    \"truckData\": {\n        \"_id\": \"672b889ca3689ac96fd5c29d\",\n        \"vehicle_id\": \"VH007\",\n        \"operator_id\": \"4893752\",\n        \"truck_make\": \"Liebherr\",\n        \"model\": \"T284\",\n        \"year\": 2021,\n        \"maximum_payload\": 39,\n        \"payload_in_tones\": 38,\n        \"avg_tyre_pressure\": 129,\n        \"max_tyre_pressure\": 145,\n        \"min_tyre_pressure\": 120,\n        \"standard_tkph\": 605,\n        \"gps_coords\": {\n            \"latitude\": 11.5705,\n            \"longitude\": 79.5032,\n            \"_id\": \"6730d10d6a6c053f014f4cb8\"\n        },\n        \"avg_speed_per_shift\": 32,\n        \"current_speed\": 0,\n        \"status\": \"rest\",\n        \"dump_truck\": {\n            \"capacity\": \"190 Tonnes\",\n            \"model\": \"Caterpillar\",\n            \"manufacturer\": \"Caterpillar\",\n            \"number_ordered\": 102,\n            \"deployment_location\": \"Various\"\n        }\n    },\n    \"opearordata\": {\n        \"_id\": \"672b888ba3689ac96fd5c291\",\n        \"operator_id\": \"4893752\",\n        \"name\": \"Sunil Chandra\",\n        \"email\": \"sunilc@example.com\",\n        \"phone_number\": \"9123456787\",\n        \"vehicle_id\": \"VH007\"\n    }\n}[\n    {\n        \"_id\": \"67302ea643f821165ae6d3a1\",\n        \"vehicle_id\": \"VH007\",\n        \"tyre_id\": \"66937\",\n        \"km_drived\": 1400,\n        \"tyre_position\": \"FL\",\n        \"tyre_pressure\": 140,\n        \"tyre_temperature\": 84,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Michelin\",\n        \"tyre_model\": \"X-Tire\",\n        \"tyre_size\": \"40/65 R33\",\n        \"tyre_tread_depth\": 40,\n        \"fixed_date\": \"2023-01-10T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-14T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d3a2\",\n        \"vehicle_id\": \"VH007\",\n        \"tyre_id\": \"66938\",\n        \"km_drived\": 1300,\n        \"tyre_position\": \"FR\",\n        \"tyre_pressure\": 138,\n        \"tyre_temperature\": 82,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Michelin\",\n        \"tyre_model\": \"X-Tire\",\n        \"tyre_size\": \"40/65 R33\",\n        \"tyre_tread_depth\": 37,\n        \"fixed_date\": \"2023-02-15T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-14T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d3a3\",\n        \"vehicle_id\": \"VH007\",\n        \"tyre_id\": \"66939\",\n        \"km_drived\": 1350,\n        \"tyre_position\": \"RL1\",\n        \"tyre_pressure\": 133,\n        \"tyre_temperature\": 80,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Michelin\",\n        \"tyre_model\": \"X-Tire\",\n        \"tyre_size\": \"40/65 R33\",\n        \"tyre_tread_depth\": 36,\n        \"fixed_date\": \"2023-02-25T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-15T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d3a4\",\n        \"vehicle_id\": \"VH007\",\n        \"tyre_id\": \"66940\",\n        \"km_drived\": 1250,\n        \"tyre_position\": \"RR1\",\n        \"tyre_pressure\": 131,\n        \"tyre_temperature\": 78,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Michelin\",\n        \"tyre_model\": \"X-Tire\",\n        \"tyre_size\": \"40/65 R33\",\n        \"tyre_tread_depth\": 34,\n        \"fixed_date\": \"2023-03-05T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-15T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d3a5\",\n        \"vehicle_id\": \"VH007\",\n        \"tyre_id\": \"66941\",\n        \"km_drived\": 1100,\n        \"tyre_position\": \"RL2\",\n        \"tyre_pressure\": 128,\n        \"tyre_temperature\": 75,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"fair\",\n        \"tyre_make\": \"Michelin\",\n        \"tyre_model\": \"X-Tire\",\n        \"tyre_size\": \"40/65 R33\",\n        \"tyre_tread_depth\": 32,\n        \"fixed_date\": \"2023-03-15T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-08-30T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d3a6\",\n        \"vehicle_id\": \"VH007\",\n        \"tyre_id\": \"66942\",\n        \"km_drived\": 1000,\n        \"tyre_position\": \"RR2\",\n        \"tyre_pressure\": 125,\n        \"tyre_temperature\": 73,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"fair\",\n        \"tyre_make\": \"Michelin\",\n        \"tyre_model\": \"X-Tire\",\n        \"tyre_size\": \"40/65 R33\",\n        \"tyre_tread_depth\": 30,\n        \"fixed_date\": \"2023-03-20T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-08-30T00:00:00.000Z\"\n    }\n]"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"tyreHealthIndex\": 76.67, \"suggestions\": [\"The average tyre pressure (133) is lower than the maximum pressure (145). Consider increasing tyre pressure to the recommended range for optimal performance and fuel efficiency.\", \"The truck is currently carrying a payload of 38 tones, which is close to its maximum capacity of 39 tones. Avoid exceeding the maximum payload capacity to prevent tyre damage and ensure safe operation.\", \"Monitor tyre pressure regularly. Maintain recommended pressure range (120-145) to ensure optimal performance and extend tyre life.\"]}\n\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "{\n    \"truckData\": {\n        \"_id\": \"672b889ca3689ac96fd5c29a\",\n        \"vehicle_id\": \"VH004\",\n        \"operator_id\": \"6940657\",\n        \"truck_make\": \"Hitachi\",\n        \"model\": \"EH3500\",\n        \"year\": 2020,\n        \"maximum_payload\": 38,\n        \"payload_in_tones\": 37,\n        \"avg_tyre_pressure\": 118,\n        \"max_tyre_pressure\": 135,\n        \"min_tyre_pressure\": 110,\n        \"standard_tkph\": 580,\n        \"gps_coords\": {\n            \"latitude\": 11.5719,\n            \"longitude\": 79.5028,\n            \"_id\": \"67305d1005f9ba73969e7d8d\"\n        },\n        \"avg_speed_per_shift\": 29,\n        \"current_speed\": 0,\n        \"status\": \"rest\",\n        \"updatedAt\": \"2024-11-10T07:20:00.729Z\"\n    },\n    \"opearordata\": {\n        \"_id\": \"67305ea036f0430a4b4b356c\",\n        \"operator_id\": \"6940657\",\n        \"name\": \"Dharmaraj\",\n        \"email\": \"nandhukrishncs@gmail.com\",\n        \"phone_number\": \"5858658425\",\n        \"vehicle_id\": \"VH004\",\n        \"__v\": 0\n    }\n}[\n    {\n        \"_id\": \"67302ea643f821165ae6d38f\",\n        \"vehicle_id\": \"VH004\",\n        \"tyre_id\": \"66915\",\n        \"km_drived\": 1200,\n        \"tyre_position\": \"FL\",\n        \"tyre_pressure\": 130,\n        \"tyre_temperature\": 78,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Goodyear\",\n        \"tyre_model\": \"Rough Terrain\",\n        \"tyre_size\": \"31.5R25\",\n        \"tyre_tread_depth\": 35,\n        \"fixed_date\": \"2023-01-05T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-10T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d390\",\n        \"vehicle_id\": \"VH004\",\n        \"tyre_id\": \"66916\",\n        \"km_drived\": 1100,\n        \"tyre_position\": \"FR\",\n        \"tyre_pressure\": 128,\n        \"tyre_temperature\": 79,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Goodyear\",\n        \"tyre_model\": \"Rough Terrain\",\n        \"tyre_size\": \"31.5R25\",\n        \"tyre_tread_depth\": 32,\n        \"fixed_date\": \"2023-02-15T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-10T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d391\",\n        \"vehicle_id\": \"VH004\",\n        \"tyre_id\": \"66917\",\n        \"km_drived\": 1250,\n        \"tyre_position\": \"RL1\",\n        \"tyre_pressure\": 124,\n        \"tyre_temperature\": 76,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Goodyear\",\n        \"tyre_model\": \"Rough Terrain\",\n        \"tyre_size\": \"31.5R25\",\n        \"tyre_tread_depth\": 34,\n        \"fixed_date\": \"2023-03-10T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-12T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d392\",\n        \"vehicle_id\": \"VH004\",\n        \"tyre_id\": \"66918\",\n        \"km_drived\": 1150,\n        \"tyre_position\": \"RR1\",\n        \"tyre_pressure\": 122,\n        \"tyre_temperature\": 77,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"good\",\n        \"tyre_make\": \"Goodyear\",\n        \"tyre_model\": \"Rough Terrain\",\n        \"tyre_size\": \"31.5R25\",\n        \"tyre_tread_depth\": 31,\n        \"fixed_date\": \"2023-03-25T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-09-12T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d393\",\n        \"vehicle_id\": \"VH004\",\n        \"tyre_id\": \"66919\",\n        \"km_drived\": 1000,\n        \"tyre_position\": \"RL2\",\n        \"tyre_pressure\": 120,\n        \"tyre_temperature\": 75,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"fair\",\n        \"tyre_make\": \"Goodyear\",\n        \"tyre_model\": \"Rough Terrain\",\n        \"tyre_size\": \"31.5R25\",\n        \"tyre_tread_depth\": 28,\n        \"fixed_date\": \"2023-04-05T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-08-20T00:00:00.000Z\"\n    },\n    {\n        \"_id\": \"67302ea643f821165ae6d394\",\n        \"vehicle_id\": \"VH004\",\n        \"tyre_id\": \"66920\",\n        \"km_drived\": 950,\n        \"tyre_position\": \"RR2\",\n        \"tyre_pressure\": 118,\n        \"tyre_temperature\": 74,\n        \"tyre_status\": \"operational\",\n        \"tyre_health\": \"fair\",\n        \"tyre_make\": \"Goodyear\",\n        \"tyre_model\": \"Rough Terrain\",\n        \"tyre_size\": \"31.5R25\",\n        \"tyre_tread_depth\": 26,\n        \"fixed_date\": \"2023-04-20T00:00:00.000Z\",\n        \"last_inspection_date\": \"2024-08-20T00:00:00.000Z\"\n    }\n]"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"tyreHealthIndex\": 73.33, \"suggestions\": [\"The average tyre pressure is 125 which is lower than the maximum recommended pressure of 135. Increase the tyre pressure to the recommended range for optimal performance and fuel efficiency.\", \"The current payload of 37 tonnes is close to the maximum payload capacity of 38 tonnes. Avoid exceeding the maximum payload to prevent tyre damage and ensure safe operation.\", \"Regularly monitor and maintain tyre pressure within the recommended range (110-135) for optimal tyre health and to extend its lifespan.\"]}\n\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(JSON.stringify(data));
    console.log(result.response.text());

   res.json(result.response.text())
  }
  
  module.exports = runLLM;
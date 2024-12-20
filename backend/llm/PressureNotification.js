const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    systemInstruction: "From the given Data find the potential cause for the failure",
  });
  
  const generationConfig = {
    temperature: 1.05,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        "potential_Cause": {
          type: "string"
        },
        "suggested_Action": {
          type: "string"
        }
      }
    },
  };
  
  async function PressureSuggtion(data) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "  [{\n  \"_id\": {\n    \"$oid\": \"6746d9c2850e6569fa93afed\"\n  },\n  \"notification_id\": \"579801\",\n  \"notification_Type\": \"TPA\",\n  \"vehicle_id\": \"VH002\",\n  \"title\": \"Critical Tyre Pressure\",\n  \"body\": \"Tyre With Id : 565423 pressure is Low\",\n  \"read\": false,\n  \"tyre_id\": \"565423\",\n  \"createdAt\": {\n    \"$date\": \"2024-11-27T08:35:14.917Z\"\n  },\n  \"updatedAt\": {\n    \"$date\": \"2024-11-27T08:35:14.917Z\"\n  },\n  \"__v\": 0\n}    use this data  {  {\n  \"_id\": {\n    \"$oid\": \"67302ea643f821165ae6d383\"\n  },\n  \"vehicle_id\": \"VH002\",\n  \"tyre_id\": \"565423\",\n  \"km_drived\": 1100,\n  \"tyre_position\": \"FL\",\n  \"tyre_pressure\": 90,\n  \"tyre_temperature\": 76,\n  \"tyre_status\": \"operational\",\n  \"tyre_health\": \"good\",\n  \"tyre_make\": \"BKT\",\n  \"tyre_model\": \"EARTHMAX SR 468\",\n  \"tyre_size\": \"40.00 R57\",\n  \"tyre_tread_depth\": 31,\n  \"fixed_date\": \"2023-01-20\",\n  \"last_inspection_date\": \"2024-09-15\",\n  \"standard_psi\": 100,\n  \"updatedAt\": {\n    \"$date\": \"2024-11-27T08:35:55.001Z\"\n  },\n  \"pressure_history\": [\n    {\n      \"date\": \"2024-11-25T08:30:00Z\",\n      \"pressure\": 101\n    },\n    {\n      \"date\": \"2024-11-26T09:15:00Z\",\n      \"pressure\": 98\n    },\n    {\n      \"date\": \"2024-11-27T10:00:00Z\",\n      \"pressure\": 100\n    },\n    {\n      \"date\": \"2024-11-28T11:45:00Z\",\n      \"pressure\": 99\n    },\n    {\n      \"date\": \"2024-11-29T13:00:00Z\",\n      \"pressure\": 102\n    },\n    {\n      \"date\": \"2024-11-30T14:30:00Z\",\n      \"pressure\": 97\n    },\n    {\n      \"date\": \"2024-12-01T15:00:00Z\",\n      \"pressure\": 96\n    },\n    {\n      \"date\": \"2024-12-02T08:45:00Z\",\n      \"pressure\": 101\n    },\n    {\n      \"date\": \"2024-12-03T09:30:00Z\",\n      \"pressure\": 99\n    },\n    {\n      \"date\": \"2024-12-04T10:15:00Z\",\n      \"pressure\": 103\n    }\n  ]\n}    }    "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"potential Cause\": \"The tyre pressure is consistently below the standard pressure of 100 psi, indicating a slow leak or gradual loss of air over time.\",\n  \"suggested Action\": \"Inspect the tyre for any visible damage, such as punctures or cuts.  Consider having a professional check the tyre for hidden issues or leaks.  If all else fails, re-inflate the tyre to the proper pressure.\"\n}\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "  {\n  \"_id\": {\n    \"$oid\": \"6746d9c2850e6569fa93afed\"\n  },\n  \"notification_id\": \"579801\",\n  \"notification_Type\": \"TPA\",\n  \"vehicle_id\": \"VH002\",\n  \"title\": \"Critical Tyre Pressure\",\n  \"body\": \"Tyre With Id : 565423 pressure is Low\",\n  \"read\": false,\n  \"tyre_id\": \"565423\",\n  \"createdAt\": {\n    \"$date\": \"2024-11-27T08:35:14.917Z\"\n  },\n  \"updatedAt\": {\n    \"$date\": \"2024-11-27T08:35:14.917Z\"\n  },\n  \"__v\": 0\n}    use this data  {  {\n  \"_id\": {\n    \"$oid\": \"67302ea643f821165ae6d383\"\n  },\n  \"vehicle_id\": \"VH002\",\n  \"tyre_id\": \"565423\",\n  \"km_drived\": 1100,\n  \"tyre_position\": \"FL\",\n  \"tyre_pressure\": 50,\n  \"tyre_temperature\": 76,\n  \"tyre_status\": \"operational\",\n  \"tyre_health\": \"good\",\n  \"tyre_make\": \"BKT\",\n  \"tyre_model\": \"EARTHMAX SR 468\",\n  \"tyre_size\": \"40.00 R57\",\n  \"tyre_tread_depth\": 31,\n  \"fixed_date\": \"2023-01-20\",\n  \"last_inspection_date\": \"2024-09-15\",\n  \"standard_psi\": 100,\n  \"updatedAt\": {\n    \"$date\": \"2024-11-27T08:35:55.001Z\"\n  },\n  \"pressure_history\": [\n    {\n      \"date\": \"2024-11-25T08:30:00Z\",\n      \"pressure\": 101\n    },\n    {\n      \"date\": \"2024-11-26T09:15:00Z\",\n      \"pressure\": 98\n    },\n    {\n      \"date\": \"2024-11-27T10:00:00Z\",\n      \"pressure\": 100\n    },\n    {\n      \"date\": \"2024-11-28T11:45:00Z\",\n      \"pressure\": 99\n    },\n    {\n      \"date\": \"2024-11-29T13:00:00Z\",\n      \"pressure\": 102\n    },\n    {\n      \"date\": \"2024-11-30T14:30:00Z\",\n      \"pressure\": 97\n    },\n    {\n      \"date\": \"2024-12-01T15:00:00Z\",\n      \"pressure\": 96\n    },\n    {\n      \"date\": \"2024-12-02T08:45:00Z\",\n      \"pressure\": 101\n    },\n    {\n      \"date\": \"2024-12-03T09:30:00Z\",\n      \"pressure\": 99\n    },\n    {\n      \"date\": \"2024-12-04T10:15:00Z\",\n      \"pressure\": 103\n    }\n  ]\n}    }    "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"potential Cause\": \"The tyre pressure (50 psi) is significantly lower than the standard pressure (100 psi), suggesting a leak or a puncture in the tyre.\",\n  \"suggested Action\": \"Immediately stop driving and inspect the tyre for any visible damage.  If a puncture or tear is found, repair or replace the tyre as soon as possible. If no visible damage is apparent, have a professional check the tyre for hidden issues or leaks.  In any case, the tyre should be inflated to the proper standard pressure before continued use.\"\n}\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(JSON.stringify(data));
    console.log(result.response.text());

    return result.response.text();
  }
  



  module.exports = PressureSuggtion
import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async (event) => { 
  const { id, title, deadline} = JSON.parse(event.body) as ICreateTodo;
  const { user_id } = event.pathParameters;
  const done = false; 
     
  await document
    .put({
      TableName: "users_todos",
      Item: {
        id,
        title,        
        user_id,
        done,
        deadline,
      }
    }).promise();  

  return {
    statusCode: 201,
    body: JSON.stringify({
      id,
      title,
      user_id,
      done,
      deadline,
    }),
    headers: {
      "Content-type": "application/json"
    },
  };
}
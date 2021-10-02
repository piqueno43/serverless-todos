import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  let todos = []
  const response = await document
    .query({
      TableName: "users_todos",
      KeyConditionExpression: "user_id = :user_id",      
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },      
    }).promise();

  todos.push(response.Items);  

  if(!todos) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Usuário não encontrado!",
      }),
    };
  }
  
  return {
    statusCode: 201,
    body: JSON.stringify({
      todos: response.Items
    }),
  }; 
}
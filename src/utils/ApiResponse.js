class ApiResponse{
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}














/*
1. Informational responses (100–199)  
   → Request received, continuing process.

2. Successful responses (200–299)  
   → The request was successfully received, understood, and accepted.

3. Redirection messages (300–399)  
   → Further action needs to be taken by the client to complete the request.

4. Client error responses (400–499)  
   → The request contains bad syntax or cannot be fulfilled by the client.

5. Server error responses (500–599)  
   → The server failed to fulfill a valid request.

*/
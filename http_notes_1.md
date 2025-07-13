# 🌐 HTTP Crash Course - Complete Guide
**📝 by Karan Patel**

## 📖 Table of Contents
- [🎯 What is HTTP?](#-what-is-http)
- [🔗 URL, URI & URN Explained](#-url-uri--urn-explained)
- [📋 HTTP Headers Deep Dive](#-http-headers-deep-dive)
- [🛠️ HTTP Methods Complete Guide](#️-http-methods-complete-guide)
- [📊 HTTP Status Codes Reference](#-http-status-codes-reference)
- [🔒 Security Headers](#-security-headers)
- [🌍 CORS Headers](#-cors-headers)
- [⚡ Performance & Network](#-performance--network)

---

## 🎯 What is HTTP?

**HTTP (HyperText Transfer Protocol)** is the foundation of data communication on the World Wide Web. It's a **request-response protocol** between clients and servers.

### **🔄 How HTTP Works**
```
Client (Browser) → HTTP Request → Server
Client (Browser) ← HTTP Response ← Server
```

### **🎪 Key Characteristics**
- **Stateless**: Each request is independent
- **Text-based**: Human-readable protocol
- **Port 80** (HTTP) / **Port 443** (HTTPS)
- **Request-Response** model

---

## 🔗 URL, URI & URN Explained

### **📊 Comparison Table**

| Term | Full Form | Purpose | Example |
|------|-----------|---------|---------|
| **URL** | Uniform Resource Locator | **Where** to find a resource | `https://youtube.com/watch?v=123` |
| **URI** | Uniform Resource Identifier | **What** identifies a resource | `mailto:user@example.com` |
| **URN** | Uniform Resource Name | **Name** of a resource | `urn:isbn:1234567890` |

### **🎯 Detailed Breakdown**

#### **🌐 URL (Uniform Resource Locator)**
```
https://www.youtube.com:443/watch?v=dQw4w9WgXcQ#t=42s
│────┤ │──────┬──────┤│─┤ │──────┬──────┤ │─────┬─────┤
│    │ │      │      ││ │ │      │      │ │     │     │
│    │ │   Domain    ││ │ │    Path     │ │   Query   │
│    │ │             ││ │ │             │ │           │
│    │ │           Port│ │ │             │ │        Fragment
│    │ │               │ │ │             │ │
│    │ │            Subdomain          │ │
│    │ │                               │ │
│  Protocol                       Parameters
│
Scheme
```

**Components:**
- **Protocol**: `https://` (how to access)
- **Domain**: `youtube.com` (where it is)
- **Port**: `:443` (which service)
- **Path**: `/watch` (what resource)
- **Query**: `?v=123` (parameters)
- **Fragment**: `#t=42s` (specific section)

#### **🔍 URI (Uniform Resource Identifier)**
**Broader concept** that includes URLs and other identification methods:
- `https://example.com/page` (URL)
- `mailto:contact@example.com` (email)
- `tel:+1234567890` (phone)
- `ftp://files.example.com/file.zip` (file transfer)

#### **📚 URN (Uniform Resource Name)**
**Permanent identifier** that doesn't change location:
- `urn:isbn:9780123456789` (book ISBN)
- `urn:uuid:12345678-1234-5678-1234-567812345678` (unique ID)

---

## 📋 HTTP Headers Deep Dive

### **🎭 What are HTTP Headers?**

**HTTP Headers** are **metadata** sent as **key-value pairs** along with HTTP requests and responses. They provide essential information about the request, response, or the data being transferred.

### **📊 Header Categories**

| Category | Direction | Purpose | Examples |
|----------|-----------|---------|----------|
| **Request Headers** | Client → Server | Information about request | `User-Agent`, `Accept` |
| **Response Headers** | Server → Client | Information about response | `Content-Type`, `Set-Cookie` |
| **Representation Headers** | Both directions | Data encoding/compression | `Content-Encoding`, `Content-Length` |
| **Payload Headers** | Both directions | Data-specific information | `Content-Type`, `Content-Range` |

### **🔧 Most Common Headers Explained**

#### **📥 Request Headers**

| Header | Purpose | Example | Explanation |
|--------|---------|---------|-------------|
| `Accept` | What content types client can handle | `Accept: application/json` | "I can process JSON responses" |
| `User-Agent` | Client information | `User-Agent: Mozilla/5.0...` | Browser/app identification |
| `Authorization` | Authentication credentials | `Authorization: Bearer token123` | "Here are my credentials" |
| `Content-Type` | Type of data being sent | `Content-Type: application/json` | "I'm sending JSON data" |
| `Cookie` | Stored client data | `Cookie: sessionId=abc123` | Previous session information |
| `Cache-Control` | Caching preferences | `Cache-Control: no-cache` | How to handle caching |

#### **📤 Response Headers**

| Header | Purpose | Example | Explanation |
|--------|---------|---------|-------------|
| `Content-Type` | Type of response data | `Content-Type: text/html` | "I'm sending HTML" |
| `Set-Cookie` | Store data on client | `Set-Cookie: id=123; HttpOnly` | "Please remember this" |
| `Cache-Control` | Caching instructions | `Cache-Control: max-age=3600` | "Cache for 1 hour" |
| `Location` | Redirect destination | `Location: /new-page` | "Go to this URL instead" |
| `Content-Length` | Size of response | `Content-Length: 1024` | "Response is 1024 bytes" |

### **📚 Historical Note**
> **X-prefix Headers**: Before 2012, custom headers used `X-` prefix (e.g., `X-Custom-Header`). This practice was **deprecated in 2012** as it caused namespace conflicts.

---

## 🛠️ HTTP Methods Complete Guide

### **🎯 What are HTTP Methods?**

HTTP Methods (also called **HTTP Verbs**) define the **basic set of operations** that can be performed on server resources. They tell the server **what action** you want to take.

### **📊 Complete Methods Reference**

| Method | Purpose | Safe* | Idempotent** | Has Body | Common Use |
|--------|---------|-------|--------------|----------|------------|
| `GET` | Retrieve a resource | ✅ | ✅ | ❌ | Fetch data |
| `POST` | Create/interact with resource | ❌ | ❌ | ✅ | Create, login, upload |
| `PUT` | Replace entire resource | ❌ | ✅ | ✅ | Full update |
| `PATCH` | Partially update resource | ❌ | ❌ | ✅ | Partial update |
| `DELETE` | Remove a resource | ❌ | ✅ | ❌ | Delete data |
| `HEAD` | Get headers only | ✅ | ✅ | ❌ | Check if exists |
| `OPTIONS` | Check available methods | ✅ | ✅ | ❌ | CORS preflight |
| `TRACE` | Echo request back | ✅ | ✅ | ❌ | Debugging |

**\* Safe**: Doesn't modify server state  
**\*\* Idempotent**: Same result when called multiple times

### **🔍 Detailed Method Explanations**

#### **📥 GET - Retrieve Data**
```http
GET /api/users/123 HTTP/1.1
Host: example.com
Accept: application/json
```
**Purpose**: Fetch data without modifying anything  
**When to use**: Reading data, displaying pages, downloading files  
**Characteristics**: Safe, idempotent, cacheable  

#### **📤 POST - Create or Process**
```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Karan Patel",
  "email": "karan@example.com"
}
```
**Purpose**: Create new resources or trigger processing  
**When to use**: User registration, file upload, form submission  
**Characteristics**: Not safe, not idempotent, can have side effects  

#### **🔄 PUT - Replace Resource**
```http
PUT /api/users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Karan Patel Updated",
  "email": "karan.new@example.com"
}
```
**Purpose**: Completely replace an existing resource  
**When to use**: Full profile updates, replacing files  
**Characteristics**: Not safe, idempotent  

#### **✏️ PATCH - Partial Update**
```http
PATCH /api/users/123 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "name": "Karan Patel Updated"
}
```
**Purpose**: Partially modify an existing resource  
**When to use**: Updating specific fields, status changes  
**Characteristics**: Not safe, not necessarily idempotent  

#### **🗑️ DELETE - Remove Resource**
```http
DELETE /api/users/123 HTTP/1.1
Host: example.com
```
**Purpose**: Remove a resource from the server  
**When to use**: Account deletion, removing posts  
**Characteristics**: Not safe, idempotent  

#### **🔍 HEAD - Headers Only**
```http
HEAD /api/users/123 HTTP/1.1
Host: example.com
```
**Purpose**: Get response headers without the body  
**When to use**: Check if resource exists, get metadata  
**Characteristics**: Safe, idempotent, same headers as GET  

#### **❓ OPTIONS - Available Methods**
```http
OPTIONS /api/users HTTP/1.1
Host: example.com
```
**Purpose**: Discover what HTTP methods are available  
**When to use**: CORS preflight requests, API discovery  
**Response example**: `Allow: GET, POST, PUT, DELETE`  

---

## 📊 HTTP Status Codes Reference

### **🎯 Status Code Categories**

| Category | Range | Meaning | Purpose |
|----------|-------|---------|---------|
| **1xx** | 100-199 | **Informational** | Request received, continuing process |
| **2xx** | 200-299 | **Success** | Request successfully received and processed |
| **3xx** | 300-399 | **Redirection** | Further action needed to complete request |
| **4xx** | 400-499 | **Client Error** | Request contains bad syntax or cannot be fulfilled |
| **5xx** | 500-599 | **Server Error** | Server failed to fulfill valid request |

### **📋 Essential Status Codes**

#### **💡 1xx - Informational**
| Code | Status | When Used | Explanation |
|------|--------|-----------|-------------|
| `100` | Continue | Large uploads | "Keep sending the rest of your request" |
| `102` | Processing | Long operations | "I'm working on it, please wait" |

#### **✅ 2xx - Success**
| Code | Status | When Used | Explanation |
|------|--------|-----------|-------------|
| `200` | OK | Successful GET/PUT/PATCH | "Request successful, here's your data" |
| `201` | Created | Successful POST | "New resource created successfully" |
| `202` | Accepted | Async processing | "Request accepted, processing in background" |
| `204` | No Content | Successful DELETE | "Success, but no data to return" |

#### **🔄 3xx - Redirection**
| Code | Status | When Used | Explanation |
|------|--------|-----------|-------------|
| `301` | Moved Permanently | URL changed forever | "This resource has moved permanently" |
| `302` | Found | Temporary redirect | "Resource temporarily at different location" |
| `307` | Temporary Redirect | POST-safe redirect | "Temporary redirect, keep same method" |
| `308` | Permanent Redirect | POST-safe permanent | "Permanent redirect, keep same method" |

#### **❌ 4xx - Client Errors**
| Code | Status | When Used | Explanation |
|------|--------|-----------|-------------|
| `400` | Bad Request | Invalid syntax | "Your request format is wrong" |
| `401` | Unauthorized | Missing auth | "You need to authenticate first" |
| `402` | Payment Required | Payment needed | "Payment is required for this resource" |
| `403` | Forbidden | Access denied | "You don't have permission" |
| `404` | Not Found | Resource missing | "Resource doesn't exist" |
| `405` | Method Not Allowed | Wrong HTTP method | "This endpoint doesn't support that method" |
| `409` | Conflict | Resource conflict | "Request conflicts with current state" |
| `422` | Unprocessable Entity | Validation errors | "Request valid but data has errors" |
| `429` | Too Many Requests | Rate limiting | "You're making requests too quickly" |

#### **💥 5xx - Server Errors**
| Code | Status | When Used | Explanation |
|------|--------|-----------|-------------|
| `500` | Internal Server Error | Unexpected server issue | "Something went wrong on our end" |
| `502` | Bad Gateway | Upstream server issue | "Problem with upstream server" |
| `503` | Service Unavailable | Server overloaded | "Server temporarily unavailable" |
| `504` | Gateway Timeout | Upstream timeout | "Upstream server didn't respond in time" |

---

## 🔒 Security Headers

### **🛡️ Essential Security Headers**

| Header | Purpose | Example | Protection Against |
|--------|---------|---------|---------------------|
| `Content-Security-Policy` | Control resource loading | `CSP: default-src 'self'` | XSS, code injection |
| `X-XSS-Protection` | XSS filtering | `X-XSS-Protection: 1; mode=block` | Cross-site scripting |
| `X-Frame-Options` | Prevent embedding | `X-Frame-Options: DENY` | Clickjacking |
| `X-Content-Type-Options` | MIME type sniffing | `X-Content-Type-Options: nosniff` | MIME confusion attacks |
| `Strict-Transport-Security` | Enforce HTTPS | `HSTS: max-age=31536000` | Protocol downgrade |
| `Cross-Origin-Embedder-Policy` | Isolate context | `COEP: require-corp` | Spectre-like attacks |
| `Cross-Origin-Opener-Policy` | Window isolation | `COOP: same-origin` | Cross-origin attacks |

### **🔐 Implementation Examples**

#### **Content Security Policy (CSP)**
```http
Content-Security-Policy: 
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' https://cdn.example.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
```

**What it does**: Controls which resources can be loaded and executed  
**Benefits**: Prevents XSS attacks, unauthorized resource loading

---

## 🌍 CORS Headers

### **🎯 What is CORS?**

**CORS (Cross-Origin Resource Sharing)** is a security mechanism that allows servers to specify which origins can access their resources from a browser.

### **📊 CORS Headers Reference**

| Header | Direction | Purpose | Example |
|--------|-----------|---------|---------|
| `Access-Control-Allow-Origin` | Response | Allowed origins | `*` or `https://example.com` |
| `Access-Control-Allow-Methods` | Response | Allowed HTTP methods | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | Response | Allowed request headers | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | Response | Allow cookies/auth | `true` |
| `Access-Control-Max-Age` | Response | Preflight cache time | `86400` (24 hours) |

### **🔄 CORS Flow**

#### **Simple Request**
```http
// Request
GET /api/data HTTP/1.1
Origin: https://myapp.com

// Response
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myapp.com
```

#### **Preflight Request**
```http
// Preflight
OPTIONS /api/data HTTP/1.1
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type

// Preflight Response
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## ⚡ Performance & Network

### **🌐 Network Lag Factors**

| Factor | Impact | Mitigation Strategy |
|--------|--------|-------------------|
| **Physical Distance** | Higher latency | CDN, Edge servers |
| **Network Congestion** | Variable delays | Traffic shaping, Load balancing |
| **DNS Resolution** | Initial delay | DNS caching, Fast DNS providers |
| **SSL Handshake** | Connection overhead | HTTP/2, Connection reuse |
| **Server Processing** | Response delay | Caching, Optimization |

### **🚀 Performance Headers**

| Header | Purpose | Example | Benefit |
|--------|---------|---------|---------|
| `Cache-Control` | Caching strategy | `max-age=3600, public` | Reduce server load |
| `ETag` | Content versioning | `ETag: "33a64df551"` | Conditional requests |
| `Last-Modified` | Modification time | `Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT` | Browser caching |
| `Vary` | Cache key factors | `Vary: Accept-Encoding, User-Agent` | Proper cache differentiation |

### **💾 Caching Strategies**

#### **Cache-Control Directives**
```http
Cache-Control: public, max-age=31536000, immutable
Cache-Control: private, no-cache, no-store, must-revalidate
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

**Directives Explained**:
- `public`: Can be cached by any cache
- `private`: Only browser cache
- `no-cache`: Must revalidate before use
- `no-store`: Don't store anywhere
- `max-age`: Cache lifetime in seconds
- `immutable`: Content never changes

---

## 📚 Quick Reference Summary

### **🎯 HTTP Method Decision Tree**
```
Need to retrieve data? → GET
Need to create something? → POST
Need to replace completely? → PUT
Need to update partially? → PATCH
Need to delete? → DELETE
Need just headers? → HEAD
Need available options? → OPTIONS
```

### **🔥 Common Status Code Patterns**
- **2xx**: Everything is fine ✅
- **3xx**: Look somewhere else 🔄
- **4xx**: You messed up ❌
- **5xx**: We messed up 💥

### **🛡️ Security Checklist**
- ✅ Use HTTPS everywhere
- ✅ Implement proper CORS
- ✅ Add security headers
- ✅ Validate all input
- ✅ Use proper authentication
- ✅ Implement rate limiting

---

**📅 Last Updated: July 13, 2025**  
**👨‍💻 Author: Karan Patel**  
**🎯 Purpose: Complete HTTP reference for web development**

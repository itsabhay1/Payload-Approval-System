# Payload Approval System

A workflow-based content approval system built using **Payload CMS**, **MongoDB**, and **Next.js**.

This system supports:
- Admin panel with collection-based workflows
- Logging of approval actions
- Role-based step assignments
- Custom API endpoints for triggering workflows manually

---

## 🔧 Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/itsabhay1/Payload-Approval-System.git
cd payload-approval-system
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Configure Environment Variables**
Create a `.env` file:

```env
DATABASE_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/payload
PAYLOAD_SECRET=some-long-random-secret
```

### 4. **Run the Project**
```bash
npm run dev
```
Open `http://localhost:3000/admin` to access the admin panel.

---

## 🏗️ Architecture Overview

### 📁 Folder Structure
```
src/
├── collections/        # Payload collections (Users, Blogs, Contracts, etc.)
├── endpoints/          # Custom API endpoints
├── plugins/            # Workflow trigger plugin
├── app/                # Next.js frontend
└── payload.config.ts   # Payload CMS configuration
```

### 🔌 Plugin Logic
- **WorkflowTriggerPlugin** listens to `afterChange` hooks in `blogs` and `contracts`
- On create/update, it checks for an active workflow matching the collection
- If found, it logs the first step in the `workflow-logs` collection

---

## 🔁 Sample Workflows

### Blog Approval Workflow
- **Step 1:** Label: `Initial Review`, Role: `reviewer`, Type: `review`
- **Step 2:** Label: `Final Approval`, Role: `approver`, Type: `approve`

### Contract Workflow
- **Step 1:** Label: `Legal Review`, Role: `admin`, Type: `comment`
- **Step 2:** Label: `Sign-off`, Role: `approver`, Type: `sign`

Use the Admin panel to define workflows and then create Blog/Contract entries to trigger logs.

---

## 👤 Demo Credentials

### Admin User
```
Email: admin@test.com
Password: Admin@123
```

### Reviewer User
```
Email: reviewer@test.com
Password: Reviewer@123
```
> You can create these users in the `Users` collection in the admin panel.

---

## 🚀 Deployment Guide (Vercel)

1. **Push your code to GitHub**
2. **Create a new project in Vercel**
3. **Link your GitHub repo**
4. **Add Environment Variables in Vercel**:
   - `DATABASE_URI`
   - `PAYLOAD_SECRET`

5. **Set build command:**
```
npm run build
```
6. **Set output directory:**
```
.next
```
7. **Deploy**

You’ll get a live admin panel URL like mine `https://payload-approval-system.vercel.app/`

---

## 📬 API Example

### Trigger Workflow
```http
POST /api/workflows/trigger
```
**Body:**
```json
{
  "collectionSlug": "blogs",
  "documentId": "<your-doc-id>"
}
```

### Check Workflow Status
```http
GET /api/workflows/status/:docId
```

---

## ✅ Done!
This project showcases Payload CMS’s flexibility using plugins, collections, and custom workflows.
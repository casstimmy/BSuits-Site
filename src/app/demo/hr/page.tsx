'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Camera, Copy, CheckCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

// Type definitions
interface Penalty {
  amount: number;
  reason: string;
  date: Date;
}

interface Bank {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

interface OnboardingData {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  stateOfOrigin?: string;
  nextOfKin?: string;
  nextOfKinPhone?: string;
  photo?: string;
}

interface Guarantor {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  relationship?: string;
  occupation?: string;
  photo?: string;
}

interface Staff {
  _id: string;
  name: string;
  password: string;
  location: string;
  role: string;
  salt: string;
  bank: Bank;
  salary: number;
  penalty: Penalty[];
  photo: string;
  onboardingToken: string;
  onboardingComplete: boolean;
  onboardingData: OnboardingData;
  guarantor: Guarantor;
  createdAt: Date;
}

const LOCATIONS = ["Ibile 1", "Ibile 2"];

function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// Mock salary table component
const SalaryTable = React.forwardRef<
  HTMLDivElement,
  { staffList?: Staff[]; currentStaff?: any }
>(({ staffList = [], currentStaff }, ref) => {
  const totalPenalties = (staff: Staff) =>
    staff.penalty?.reduce((sum: number, p) => sum + (p.amount || 0), 0) || 0;

  const filteredStaffList = staffList.filter(
    (staff: Staff) => (Number(staff.salary) || 0) - totalPenalties(staff) > 0
  );

  const totalAmount = filteredStaffList.reduce(
    (total: number, staff: Staff) =>
      total + ((Number(staff.salary) || 0) - totalPenalties(staff)),
    0
  );

  const chunkedStaff: Staff[][] = [];
  for (let i = 0; i < filteredStaffList.length; i += 5) {
    chunkedStaff.push(filteredStaffList.slice(i, i + 5));
  }

  const calculateSubtotal = (staffChunk: Staff[]) =>
    staffChunk.reduce(
      (sum: number, staff: Staff) =>
        sum + ((Number(staff.salary) || 0) - totalPenalties(staff)),
      0
    );

  const handleViewMemo = (staffChunk: Staff[], index: number) => {
    localStorage.setItem("staffPayroll", JSON.stringify(staffChunk));
    localStorage.setItem("payrollChunkIndex", index.toString());
  };

  return (
    <div ref={ref} className="space-y-8 mt-4">
      {chunkedStaff.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No staff with salary data</p>
      ) : (
        chunkedStaff.map((chunk: any, index: number) => {
          const chunkTotal = calculateSubtotal(chunk);
          return (
            <div key={index} className="space-y-2">
              <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                <table className="min-w-full table-auto border-collapse text-sm">
                  <thead className="bg-blue-100 font-bold text-gray-700">
                    <tr>
                      <th className="border-b px-4 py-3 text-left">Staff Name</th>
                      <th className="border-b px-4 py-3 text-left">Account Name</th>
                      <th className="border-b px-4 py-3 text-left">Bank Account</th>
                      <th className="border-b px-4 py-3 text-left">Bank Name</th>
                      {currentStaff?.role === "admin" && (
                        <th className="border-b px-4 py-3 text-left">Amount</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {chunk.map((staff: any) => (
                      <tr
                        key={staff._id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="border-b px-4 py-2">{staff.name}</td>
                        <td className="border-b px-4 py-2">
                          {staff.bank?.accountName || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {staff.bank?.accountNumber || "N/A"}
                        </td>
                        <td className="border-b px-4 py-2">
                          {staff.bank?.bankName || "N/A"}
                        </td>
                        {currentStaff?.role === "admin" && (
                          <td className="border-b px-4 py-2">
                            ₦
                            {Number(
                              (staff.salary || 0) - calculateSubtotal([staff])
                            ).toLocaleString()}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {currentStaff?.role === "admin" && (
                <div className="flex justify-between items-center p-3 bg-blue-50 border-t rounded-lg shadow-sm">
                  <div className="text-sm font-semibold text-blue-900">
                    Subtotal: ₦{Number(chunkTotal).toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleViewMemo(chunk, index)}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 transition"
                  >
                    View Memo
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
});

SalaryTable.displayName = "SalaryTable";

// Mock data
const MOCK_STAFF: Staff[] = [
  {
    _id: "1",
    name: "Chioma Adeyemi",
    password: "1234",
    location: "Ibile 1",
    role: "staff",
    salt: "$2b$10$salt1",
    bank: {
      accountName: "Chioma Adeyemi",
      accountNumber: "1234567890",
      bankName: "GTBank",
    },
    salary: 50000,
    penalty: [
      {
        amount: 2000,
        reason: "Late arrival",
        date: new Date("2025-02-15"),
      },
    ],
    photo: "https://i.pravatar.cc/150?img=1",
    onboardingToken: "token-1",
    onboardingComplete: true,
    onboardingData: {
      fullName: "Chioma Adeyemi Johnson",
      email: "chioma@example.com",
      phone: "+234-802-123-4567",
      address: "123 Lagos Street, Lagos",
      dateOfBirth: "1995-05-15",
      stateOfOrigin: "Lagos",
      nextOfKin: "John Adeyemi",
      nextOfKinPhone: "+234-803-456-7890",
      photo: "https://i.pravatar.cc/150?img=1",
    },
    guarantor: {
      name: "Abimbola Okafor",
      phone: "+234-805-555-1234",
      email: "abimbola@example.com",
      address: "456 Ikeja Avenue, Lagos",
      relationship: "Sister",
      occupation: "Teacher",
      photo: "https://i.pravatar.cc/150?img=2",
    },
    createdAt: new Date("2024-01-10"),
  },
  {
    _id: "2",
    name: "Tunde Olayinka",
    password: "5678",
    location: "Ibile 2",
    role: "Senior staff",
    salt: "$2b$10$salt2",
    bank: {
      accountName: "Tunde Olayinka",
      accountNumber: "0987654321",
      bankName: "Access Bank",
    },
    salary: 75000,
    penalty: [],
    photo: "https://i.pravatar.cc/150?img=3",
    onboardingToken: "token-2",
    onboardingComplete: false,
    onboardingData: {},
    guarantor: {},
    createdAt: new Date("2024-03-20"),
  },
  {
    _id: "3",
    name: "Grace Eze",
    password: "4321",
    location: "Ibile 1",
    role: "staff",
    salt: "$2b$10$salt3",
    bank: {
      accountName: "Grace Eze",
      accountNumber: "1111111111",
      bankName: "First Bank",
    },
    salary: 45000,
    penalty: [
      {
        amount: 1000,
        reason: "Absence",
        date: new Date("2025-02-18"),
      },
      {
        amount: 3000,
        reason: "Damaged equipment",
        date: new Date("2025-02-10"),
      },
    ],
    photo: "https://i.pravatar.cc/150?img=4",
    onboardingToken: "token-3",
    onboardingComplete: true,
    onboardingData: {
      fullName: "Grace Eze Chidinma",
      email: "grace@example.com",
      phone: "+234-809-321-6547",
      address: "789 Surulere Lane, Lagos",
      dateOfBirth: "1998-11-22",
      stateOfOrigin: "Enugu",
      nextOfKin: "Peter Eze",
      nextOfKinPhone: "+234-807-654-3210",
      photo: "https://i.pravatar.cc/150?img=4",
    },
    guarantor: {
      name: "Samuel O'Connor",
      phone: "+234-804-222-5555",
      email: "samuel@example.com",
      address: "321 Victoria Island, Lagos",
      relationship: "Uncle",
      occupation: "Engineer",
      photo: "https://i.pravatar.cc/150?img=5",
    },
    createdAt: new Date("2024-05-05"),
  },
  {
    _id: "4",
    name: "Blessing Okonkwo",
    password: "9999",
    location: "Ibile 2",
    role: "account",
    salt: "$2b$10$salt4",
    bank: {
      accountName: "Blessing Okonkwo",
      accountNumber: "2222222222",
      bankName: "Zenith Bank",
    },
    salary: 60000,
    penalty: [],
    photo: "https://i.pravatar.cc/150?img=6",
    onboardingToken: "token-4",
    onboardingComplete: true,
    onboardingData: {
      fullName: "Blessing Chiamaka Okonkwo",
      email: "blessing@example.com",
      phone: "+234-810-789-0123",
      address: "555 Bariga Road, Lagos",
      dateOfBirth: "1996-08-30",
      stateOfOrigin: "Abia",
      nextOfKin: "Mary Okonkwo",
      nextOfKinPhone: "+234-811-234-5678",
      photo: "https://i.pravatar.cc/150?img=6",
    },
    guarantor: {},
    createdAt: new Date("2024-06-15"),
  },
];

export default function ManageStaff() {
  const [staffList, setStaffList] = useState<Staff[]>(MOCK_STAFF);
  const [loadingStaffList, setLoadingStaffList] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("list");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const salaryMemoRef = useRef<any>(null);
  const staffPhotoRef = useRef<HTMLInputElement>(null);

  const [currentStaff, setCurrentStaff] = useState({ role: "admin", name: "Admin User" });

  // Photo upload state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Onboarding / profile viewer
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Penalty edit state
  const [editingPenalty, setEditingPenalty] = useState<{ staffId: string; index: number } | null>(null);
  const [editPenaltyForm, setEditPenaltyForm] = useState({ amount: "", reason: "", date: "" });
  const [clearingPenalties, setClearingPenalties] = useState(false);

  const [form, setForm] = useState({
    name: "",
    password: "",
    location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    role: "staff",
    bank: {
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
    staffId: "",
    reason: "",
    amount: "",
    salary: "",
    photo: "",
    date: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    password: "",
    location: "",
    role: "staff",
    bank: {
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
    photo: "",
  });

  // Edit photo state
  const [editPhotoPreview, setEditPhotoPreview] = useState<string | null>(null);
  const [uploadingEditPhoto, setUploadingEditPhoto] = useState(false);
  const editPhotoRef = useRef<HTMLInputElement>(null);

  // Generate unique ID for new staff
  const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

  // Generate onboarding token
  const generateToken = () => "token_" + Math.random().toString(36).substr(2, 20);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPhotoPreview(result);
      setPhotoUrl(result); // Use data URL directly
    };
    reader.readAsDataURL(file);
    setUploadingPhoto(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploadingPhoto(false);
    }, 800);
  };

  const copyOnboardingLink = (staffMember: any) => {
    const link = `${window.location.origin}/onboarding/${staffMember.onboardingToken}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(staffMember._id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (["accountName", "accountNumber", "bankName"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        bank: {
          ...prev.bank,
          [name]: value,
        },
      }));
    } else if (name === "name") {
      setForm((prev) => ({ ...prev, name: toCamelCase(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (["accountName", "accountNumber", "bankName"].includes(name)) {
      setEditForm((prev) => ({
        ...prev,
        bank: {
          ...prev.bank,
          [name]: value,
        },
      }));
    } else if (name === "name") {
      setEditForm((prev) => ({ ...prev, name: toCamelCase(value) }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.password) {
      setMessage("Name and password are required.");
      return;
    }

    // Create new staff object
    const newStaff: Staff = {
      _id: generateId(),
      name: form.name,
      password: form.password,
      location: form.location,
      role: form.role,
      salt: "$2b$10$" + Math.random().toString(36).substr(2, 9),
      bank: {
        accountName: form.bank.accountName,
        accountNumber: form.bank.accountNumber,
        bankName: form.bank.bankName,
      },
      salary: Number(form.salary) || 0,
      penalty: [],
      photo: photoUrl || "",
      onboardingToken: generateToken(),
      onboardingComplete: false,
      onboardingData: {},
      guarantor: {},
      createdAt: new Date(),
    };

    setStaffList((prev) => [...prev, newStaff]);
    setMessage("✓ Staff added successfully.");
    
    // Reset form
    setForm({
      name: "",
      password: "",
      location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
      role: "staff",
      bank: {
        accountName: "",
        accountNumber: "",
        bankName: "",
      },
      staffId: "",
      reason: "",
      amount: "",
      photo: "",
      date: "",
    });
    setPhotoPreview(null);
    setPhotoUrl("");

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePenaltySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { staffId, reason, amount, date } = form;

    if (!staffId || !reason || !amount) {
      setMessage("All penalty fields are required.");
      return;
    }

    // Find staff and add penalty
    setStaffList((prev: Staff[]) =>
      prev.map((staff: Staff) =>
        staff._id === staffId
          ? {
              ...staff,
              penalty: [
                ...staff.penalty,
                {
                  amount: Number(amount),
                  reason: reason.trim() || "Unspecified",
                  date: new Date(date || new Date()),
                },
              ],
            }
          : staff
      )
    );

    setMessage("✓ Penalty submitted successfully.");
    setForm((prev) => ({
      ...prev,
      staffId: "",
      reason: "",
      amount: "",
      date: "",
    }));
    setActiveTab("list");

    setTimeout(() => setMessage(""), 3000);
  };

  const startEdit = (staff: Staff) => {
    setEditingId(staff._id);
    setEditForm({
      name: staff.name || "",
      password: "",
      location: staff.location || "",
      role: staff.role || "staff",
      bank: {
        accountName: staff.bank?.accountName || "",
        accountNumber: staff.bank?.accountNumber || "",
        bankName: staff.bank?.bankName || "",
      },
      photo: staff.photo || "",
    });
    setEditPhotoPreview(staff.photo || null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditPhotoPreview(null);
    setEditForm({
      name: "",
      password: "",
      location: "",
      role: "staff",
      bank: {
        accountName: "",
        accountNumber: "",
        bankName: "",
      },
      photo: "",
    });
  };

  const handleEditPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setEditPhotoPreview(result);
      setEditForm((prev) => ({ ...prev, photo: result }));
    };
    reader.readAsDataURL(file);

    setUploadingEditPhoto(true);
    setTimeout(() => {
      setUploadingEditPhoto(false);
    }, 800);
  };

  const saveEdit = (id: string) => {
    if (!editForm.name) {
      setMessage("Name is required.");
      return;
    }

    setSaving(true);

    // Update staff
    setStaffList((prev: Staff[]) =>
      prev.map((staff: Staff) =>
        staff._id === id
          ? {
              ...staff,
              name: editForm.name,
              location: editForm.location,
              role: editForm.role,
              bank: editForm.bank,
              photo: editPhotoPreview || staff.photo,
              password: editForm.password || staff.password,
            }
          : staff
      )
    );

    setMessage("✓ Staff updated successfully.");
    setEditingId(null);
    setSaving(false);

    setTimeout(() => setMessage(""), 3000);
  };

  const deleteStaff = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this staff?");
    if (!confirmDelete) return;

    setMessage("");

    setStaffList((prev: Staff[]) => prev.filter((staff: Staff) => staff._id !== id));
    setMessage("✓ Staff deleted successfully.");

    if (editingId === id) cancelEdit();

    setTimeout(() => setMessage(""), 3000);
  };

  const handleMemoView = () => {
    localStorage.setItem("staffPayroll", JSON.stringify(staffList));
  };

  const handleEditPenalty = (staffId: string, index: number, penalty: Penalty) => {
    setEditingPenalty({ staffId, index });
    setEditPenaltyForm({
      amount: penalty.amount || "",
      reason: penalty.reason || "",
      date: penalty.date ? new Date(penalty.date).toISOString().split("T")[0] : "",
    });
  };

  const handleSavePenaltyEdit = () => {
    if (!editingPenalty) return;

    setStaffList((prev: Staff[]) =>
      prev.map((staff: Staff) =>
        staff._id === editingPenalty.staffId
          ? {
              ...staff,
              penalty: staff.penalty.map((p: Penalty, i: number) =>
                i === editingPenalty.index
                  ? {
                      amount: Number(editPenaltyForm.amount),
                      reason: editPenaltyForm.reason,
                      date: new Date(editPenaltyForm.date),
                    }
                  : p
              ),
            }
          : staff
      )
    );

    setMessage("✓ Penalty updated successfully.");
    setEditingPenalty(null);

    setTimeout(() => setMessage(""), 3000);
  };

  const handleDeletePenalty = (staffId: string, index: number) => {
    if (!confirm("Are you sure you want to delete this penalty?")) return;

    setStaffList((prev: Staff[]) =>
      prev.map((staff: Staff) =>
        staff._id === staffId
          ? {
              ...staff,
              penalty: staff.penalty.filter((_: Penalty, i: number) => i !== index),
            }
          : staff
      )
    );

    setMessage("✓ Penalty deleted successfully.");

    setTimeout(() => setMessage(""), 3000);
  };

  const handleClearAllPenalties = () => {
    if (
      !confirm(
        "Clear ALL penalties for ALL staff? This usually happens after salary memo is generated."
      )
    )
      return;

    setClearingPenalties(true);

    setTimeout(() => {
      setStaffList((prev: Staff[]) =>
        prev.map((staff: Staff) => ({
          ...staff,
          penalty: [],
        }))
      );

      setMessage("✓ All penalties cleared successfully.");
      setClearingPenalties(false);

      setTimeout(() => setMessage(""), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 sm:mb-6">
          Manage Staff
        </h1>

        {/* Add New Staff Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 shadow rounded h-fit"
          >
            <h2 className="text-base sm:text-lg font-semibold mb-3 text-blue-700">
              Add New Staff
            </h2>

            {/* Staff Photo Upload */}
            <div className="flex items-center gap-4 mb-4">
              <div
                onClick={() => staffPhotoRef.current?.click()}
                className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition overflow-hidden shrink-0"
              >
                {uploadingPhoto ? (
                  <Loader2 size={20} className="text-blue-400 animate-spin" />
                ) : photoPreview ? (
                  <img src={photoPreview} alt="Staff" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={20} className="text-gray-400" />
                )}
              </div>
              <input
                ref={staffPhotoRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <p className="text-xs text-gray-400">
                Upload staff passport photo (optional — can also be filled via onboarding form)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Staff Name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                maxLength={4}
                inputMode="numeric"
                pattern="\d{4}"
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d{0,4}$/.test(val)) {
                    handleChange(e);
                  }
                }}
                className="border p-2 rounded w-full"
                required
              />
              <select
                name="location"
                value={form.location}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="staff">Staff</option>
                <option value="account">Account</option>
                <option value="Senior staff">Manager</option>
                <option value="admin">Admin</option>
                <option value="junior staff">Junior Staff</option>
              </select>
              <input
                type="text"
                name="accountName"
                placeholder="Account Name"
                value={form.bank.accountName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={form.bank.accountNumber}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={form.bank.bankName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="salary"
                placeholder="Salary Amount"
                value={form.salary}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            {message && <p className="text-sm text-blue-700 mb-3">{message}</p>}

            <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 w-full">
              Add Staff
            </button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* All Staff List */}
          <div className="bg-white p-4 sm:p-6 shadow rounded-lg w-full lg:w-2/3 overflow-y-auto max-h-[600px]">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-700">
              All Staff
            </h2>

            {staffList.length === 0 ? (
              <p className="text-gray-500">No staff created yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {staffList.map((staff: Staff) => (
                  <div
                    key={staff._id}
                    className="p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 border border-gray-200 bg-white"
                  >
                    {editingId === staff._id ? (
                      <div className="space-y-3">
                        {/* Edit Photo */}
                        <div className="flex items-center gap-3">
                          <div
                            onClick={() => editPhotoRef.current?.click()}
                            className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition overflow-hidden shrink-0"
                          >
                            {uploadingEditPhoto ? (
                              <Loader2 size={18} className="text-blue-400 animate-spin" />
                            ) : editPhotoPreview ? (
                              <img src={editPhotoPreview} alt="Staff" className="w-full h-full object-cover" />
                            ) : (
                              <Camera size={18} className="text-gray-400" />
                            )}
                          </div>
                          <input
                            ref={editPhotoRef}
                            type="file"
                            accept="image/*"
                            onChange={handleEditPhotoUpload}
                            className="hidden"
                          />
                          <span className="text-xs text-gray-400">Update photo</span>
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        />
                        <select
                          name="location"
                          value={editForm.location}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        >
                          {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                        <select
                          name="role"
                          value={editForm.role}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        >
                          <option value="staff">Staff</option>
                          <option value="account">Account</option>
                          <option value="Senior staff">Manager</option>
                          <option value="admin">Admin</option>
                          <option value="junior staff">Junior Staff</option>
                        </select>
                        <input
                          type="password"
                          name="password"
                          placeholder="Leave blank to keep current password"
                          value={editForm.password}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d{0,4}$/.test(val)) handleEditChange(e);
                          }}
                          className="border p-2 rounded w-full"
                          maxLength={4}
                          inputMode="numeric"
                          pattern="\d{4}"
                        />
                        <input
                          type="text"
                          name="accountName"
                          placeholder="Account Name"
                          value={editForm.bank.accountName}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        />
                        <input
                          type="text"
                          name="accountNumber"
                          placeholder="Account Number"
                          value={editForm.bank.accountNumber}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        />
                        <input
                          type="text"
                          name="bankName"
                          placeholder="Bank Name"
                          value={editForm.bank.bankName}
                          onChange={handleEditChange}
                          className="border p-2 rounded w-full"
                        />
                        <div className="text-xs text-gray-500">
                          Leave blank to keep existing password.
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => saveEdit(staff._id)}
                            disabled={saving}
                            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm disabled:opacity-50"
                          >
                            {saving ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        <div className="flex items-start gap-4 w-full">
                          {staff.photo ? (
                            <img
                              src={staff.photo}
                              alt={staff.name}
                              className="w-10 h-10 rounded-full object-cover shrink-0"
                              onError={(e: any) => {
                                e.target.style.display = "none";
                                e.target.nextElementSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div className={`w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg shrink-0 ${staff.photo ? "hidden" : ""}`}>
                            {staff.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-lg font-semibold text-gray-800">
                              {staff.name}
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              📍 {staff.location}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full inline-block
                                  ${
                                    staff.role === "admin" || staff.role === "Senior staff"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                              >
                                {staff.role}
                              </span>
                              {staff.onboardingComplete ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                                  <CheckCircle size={10} /> Onboarded
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                  Pending Form
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 shrink-0">
                            <button
                              onClick={() => startEdit(staff)}
                              className="text-xs px-2 py-1 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-500 hover:text-white transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteStaff(staff._id)}
                              className="text-xs px-2 py-1 border border-red-500 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Onboarding Link + Profile Toggle */}
                        <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2">
                          {staff.onboardingToken && (
                            <button
                              onClick={() => copyOnboardingLink(staff)}
                              className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100 transition"
                            >
                              {copiedLink === staff._id ? (
                                <>
                                  <CheckCircle size={12} /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={12} /> Copy Onboarding Link
                                </>
                              )}
                            </button>
                          )}
                          {staff.onboardingComplete && (
                            <button
                              onClick={() =>
                                setExpandedProfile(
                                  expandedProfile === staff._id ? null : staff._id
                                )
                              }
                              className="flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition"
                            >
                              {expandedProfile === staff._id ? (
                                <>
                                  <ChevronUp size={12} /> Hide Profile
                                </>
                              ) : (
                                <>
                                  <ChevronDown size={12} /> View Profile
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Expanded Profile Details */}
                        {expandedProfile === staff._id && staff.onboardingComplete && (
                          <div className="mt-3 bg-gray-50 rounded-lg p-3 text-xs space-y-3">
                            {staff.onboardingData && Object.keys(staff.onboardingData).length > 0 && (
                              <div>
                                <h4 className="font-semibold text-blue-700 mb-1">
                                  📋 Personal Details
                                </h4>
                                <div className="grid grid-cols-2 gap-1">
                                  {staff.onboardingData.fullName && (
                                    <p>
                                      <span className="text-gray-500">Name:</span>{" "}
                                      {staff.onboardingData.fullName}
                                    </p>
                                  )}
                                  {staff.onboardingData.phone && (
                                    <p>
                                      <span className="text-gray-500">Phone:</span>{" "}
                                      {staff.onboardingData.phone}
                                    </p>
                                  )}
                                  {staff.onboardingData.email && (
                                    <p>
                                      <span className="text-gray-500">Email:</span>{" "}
                                      {staff.onboardingData.email}
                                    </p>
                                  )}
                                  {staff.onboardingData.dateOfBirth && (
                                    <p>
                                      <span className="text-gray-500">DOB:</span>{" "}
                                      {staff.onboardingData.dateOfBirth}
                                    </p>
                                  )}
                                  {staff.onboardingData.stateOfOrigin && (
                                    <p>
                                      <span className="text-gray-500">State:</span>{" "}
                                      {staff.onboardingData.stateOfOrigin}
                                    </p>
                                  )}
                                  {staff.onboardingData.address && (
                                    <p className="col-span-2">
                                      <span className="text-gray-500">Address:</span>{" "}
                                      {staff.onboardingData.address}
                                    </p>
                                  )}
                                  {staff.onboardingData.nextOfKin && (
                                    <p>
                                      <span className="text-gray-500">Next of Kin:</span>{" "}
                                      {staff.onboardingData.nextOfKin}
                                    </p>
                                  )}
                                  {staff.onboardingData.nextOfKinPhone && (
                                    <p>
                                      <span className="text-gray-500">NoK Phone:</span>{" "}
                                      {staff.onboardingData.nextOfKinPhone}
                                    </p>
                                  )}
                                </div>
                                {staff.onboardingData.photo && (
                                  <img
                                    src={staff.onboardingData.photo}
                                    alt="Staff passport"
                                    className="w-16 h-16 rounded-lg object-cover mt-2 border"
                                  />
                                )}
                              </div>
                            )}
                            {staff.guarantor && Object.keys(staff.guarantor).length > 0 && (
                              <div>
                                <h4 className="font-semibold text-blue-700 mb-1">
                                  🤝 Guarantor
                                </h4>
                                <div className="grid grid-cols-2 gap-1">
                                  {staff.guarantor.name && (
                                    <p>
                                      <span className="text-gray-500">Name:</span>{" "}
                                      {staff.guarantor.name}
                                    </p>
                                  )}
                                  {staff.guarantor.phone && (
                                    <p>
                                      <span className="text-gray-500">Phone:</span>{" "}
                                      {staff.guarantor.phone}
                                    </p>
                                  )}
                                  {staff.guarantor.email && (
                                    <p>
                                      <span className="text-gray-500">Email:</span>{" "}
                                      {staff.guarantor.email}
                                    </p>
                                  )}
                                  {staff.guarantor.relationship && (
                                    <p>
                                      <span className="text-gray-500">Relationship:</span>{" "}
                                      {staff.guarantor.relationship}
                                    </p>
                                  )}
                                  {staff.guarantor.occupation && (
                                    <p>
                                      <span className="text-gray-500">Occupation:</span>{" "}
                                      {staff.guarantor.occupation}
                                    </p>
                                  )}
                                  {staff.guarantor.address && (
                                    <p className="col-span-2">
                                      <span className="text-gray-500">Address:</span>{" "}
                                      {staff.guarantor.address}
                                    </p>
                                  )}
                                </div>
                                {staff.guarantor.photo && (
                                  <img
                                    src={staff.guarantor.photo}
                                    alt="Guarantor passport"
                                    className="w-16 h-16 rounded-lg object-cover mt-2 border"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-6">
              Note: Passwords are hashed and not displayed for security.
            </p>
          </div>

          {/* Penalty Entry */}
          <div className="bg-white p-4 sm:p-6 shadow rounded-lg w-full lg:w-1/3 overflow-y-auto max-h-[600px]">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-700">
              Staff Penalty
            </h2>

            {/* Tab Pills */}
            <div className="flex space-x-2 sm:space-x-4 mb-4">
              <button
                className={`px-3 sm:px-4 py-2 rounded-full text-sm transition ${
                  activeTab === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("list")}
              >
                Penalty List
              </button>

              <button
                className={`px-3 sm:px-4 py-2 rounded-full text-sm transition ${
                  activeTab === "form"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("form")}
              >
                Add Penalty
              </button>
            </div>

            {/* Penalty List */}
            {activeTab === "list" && (
              <div className="space-y-4">
                {staffList
                  .filter((s: Staff) => s.penalty && s.penalty.length)
                  .map((staff: Staff) => (
                    <div
                      key={staff._id}
                      className="bg-white border border-gray-200 p-4 sm:p-5 rounded-lg shadow hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                          {staff.name}
                          <span className="text-sm text-gray-500 ml-2">
                            ({staff.role})
                          </span>
                        </h3>
                        <span className="text-xs sm:text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          {staff.penalty.length} Penalt
                          {staff.penalty.length > 1 ? "ies" : "y"}
                        </span>
                      </div>
                      <ul className="space-y-2 pl-4 border-l-2 border-blue-100">
                        {staff.penalty.map((p: Penalty, i: number) => (
                          <li key={i} className="text-sm text-gray-800">
                            {editingPenalty?.staffId === staff._id &&
                            editingPenalty?.index === i ? (
                              <div className="flex flex-wrap items-center gap-2 py-1">
                                <input
                                  type="number"
                                  value={editPenaltyForm.amount}
                                  onChange={(e) =>
                                    setEditPenaltyForm((prev) => ({
                                      ...prev,
                                      amount: e.target.value,
                                    }))
                                  }
                                  className="border px-2 py-1 rounded text-sm w-20"
                                  placeholder="Amount"
                                />
                                <input
                                  type="text"
                                  value={editPenaltyForm.reason}
                                  onChange={(e) =>
                                    setEditPenaltyForm((prev) => ({
                                      ...prev,
                                      reason: e.target.value,
                                    }))
                                  }
                                  className="border px-2 py-1 rounded text-sm flex-1 min-w-[100px]"
                                  placeholder="Reason"
                                />
                                <input
                                  type="date"
                                  value={editPenaltyForm.date}
                                  onChange={(e) =>
                                    setEditPenaltyForm((prev) => ({
                                      ...prev,
                                      date: e.target.value,
                                    }))
                                  }
                                  className="border px-2 py-1 rounded text-sm"
                                />
                                <button
                                  onClick={handleSavePenaltyEdit}
                                  className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingPenalty(null)}
                                  className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between gap-2">
                                <span>
                                  <span className="font-medium text-red-700">
                                    ₦{Number(p.amount).toLocaleString()}
                                  </span>
                                  {" – "}
                                  <span className="italic">{p.reason}</span>{" "}
                                  <span className="text-gray-500">
                                    ({new Date(p.date).toLocaleDateString()})
                                  </span>
                                </span>
                                <div className="flex gap-1 shrink-0">
                                  <button
                                    onClick={() =>
                                      handleEditPenalty(staff._id, i, p)
                                    }
                                    className="text-xs text-blue-600 border border-blue-400 px-2 py-0.5 rounded hover:bg-blue-500 hover:text-white transition"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeletePenalty(staff._id, i)
                                    }
                                    className="text-xs text-red-600 border border-red-400 px-2 py-0.5 rounded hover:bg-red-500 hover:text-white transition"
                                  >
                                    Del
                                  </button>
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {staffList.some((s: Staff) => s.penalty && s.penalty.length > 0) && (
                  <button
                    onClick={handleClearAllPenalties}
                    disabled={clearingPenalties}
                    className="w-full mt-4 bg-red-600 text-white text-sm py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {clearingPenalties
                      ? "Clearing..."
                      : "Clear All Penalties (After Memo)"}
                  </button>
                )}

                {!staffList.some(
                  (s: Staff) => s.penalty && s.penalty.length > 0
                ) && (
                  <p className="text-gray-500 text-sm italic">
                    No penalties recorded.
                  </p>
                )}
              </div>
            )}

            {/* Add Penalty Form */}
            {activeTab === "form" && (
              <form
                onSubmit={handlePenaltySubmit}
                className="grid grid-cols-1 gap-4 mt-2"
              >
                <select
                  name="staffId"
                  value={form.staffId}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Staff</option>
                  {staffList.map((staff: Staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.name} ({staff.role})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  name="amount"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Penalty Amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                />

                <input
                  type="text"
                  name="reason"
                  inputMode="text"
                  placeholder="Reason"
                  value={form.reason}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />

                <button
                  type="submit"
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            )}

            {message && (
              <p className="text-sm text-blue-700 mb-3 mt-3">{message}</p>
            )}
          </div>
        </div>

        {/* Salary Table Entry */}
        <div className="bg-white mt-4 sm:mt-8 p-4 sm:p-6 shadow rounded-lg w-full overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-700">
            Salary Table
          </h2>

          <SalaryTable currentStaff={currentStaff} staffList={staffList} ref={salaryMemoRef} />

          {currentStaff?.role === "admin" && (
            <div className="flex flex-col sm:flex-row justify-end mt-4 sm:mt-6 gap-2 sm:gap-3">
              <button
                onClick={() => alert("Mail sending simulated (no database)")}
                disabled={isSending}
                className={`${
                  isSending
                    ? "bg-gray-400"
                    : "bg-gray-500 hover:bg-gray-700"
                } text-white px-4 py-2 rounded transition-colors duration-200 cursor-pointer text-sm w-full sm:w-auto`}
              >
                {isSending ? "Sending Mail..." : "Send Salary Mail"}
              </button>

              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm w-full sm:w-auto"
              >
                Print Salary Table
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

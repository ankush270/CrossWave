import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaTruck,
  FaWarehouse,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaDownload,
  FaShippingFast,
} from "react-icons/fa";
import DashboardBackground from "../common/DashboardBackground";
import { toast } from "sonner";
import { useAuth } from "../../contexts/AuthContext.jsx";

const SellerLogistics = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("shipments");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [showCancelPickupModal, setShowCancelPickupModal] = useState(false);
  // const [showReturnShipmentModal, setShowReturnShipmentModal] = useState(false);
  const [showCancelShipmentModal, setShowCancelShipmentModal] = useState(false);
  const [shipments, setShipments] = useState([]);

  const [formData, setFormData] = useState({
    labelResponseOptions: "URL_ONLY",
    requestedShipment: {
      shipper: {
        contact: {
          personName: "ash",
          phoneNumber: "1122334455",
        },
        address: {
          streetLines: ["nkl"],
          city: "Memphis",
          stateOrProvinceCode: "TN",
          postalCode: "38116",
          countryCode: "US",
        },
      },
      recipients: [
        {
          contact: {
            personName: "",
            phoneNumber: "",
          },
          address: {
            streetLines: [""],
            city: "",
            stateOrProvinceCode: "",
            postalCode: "",
            countryCode: "IN",
          },
        },
      ],
      shipDatestamp: new Date().toISOString().split("T")[0],
      serviceType: "INTERNATIONAL_PRIORITY",
      packagingType: "YOUR_PACKAGING",
      pickupType: "USE_SCHEDULED_PICKUP",
      shippingChargesPayment: {
        paymentType: "SENDER",
      },
      labelSpecification: {
        imageType: "PDF",
        labelStockType: "PAPER_85X11_TOP_HALF_LABEL",
      },
      customsClearanceDetail: {
        dutiesPayment: {
          paymentType: "SENDER",
        },
        commodities: [
          {
            description: "",
            countryOfManufacture: "",
            quantity: 1,
            quantityUnits: "PCS",
            unitPrice: {
              amount: 0,
              currency: "USD",
            },
            customsValue: {
              amount: 0,
              currency: "USD",
            },
            weight: {
              units: "LB",
              value: 0,
            },
          },
        ],
      },
      shippingDocumentSpecification: {
        shippingDocumentTypes: ["COMMERCIAL_INVOICE"],
        commercialInvoiceDetail: {
          documentFormat: {
            stockType: "PAPER_LETTER",
            docType: "PDF",
          },
        },
      },
      requestedPackageLineItems: [
        {
          weight: {
            units: "LB",
            value: 0,
          },
        },
      ],
    },
    accountNumber: {
      value: "740561073",
    },
  });

  const [pickupFormData, setPickupFormData] = useState({
    associatedAccountNumber: {
      value: "740561073",
    },
    originDetail: {
      pickupLocation: {
        contact: {
          personName: "",
          phoneNumber: "",
        },
        address: {
          streetLines: [""],
          city: "",
          stateOrProvinceCode: "",
          postalCode: "",
          countryCode: "IN",
        },
      },
      readyDateTimestamp: new Date().toISOString(),
      customerCloseTime: "17:00:00",
    },
    carrierCode: "FDXE",
  });

  const [cancelPickupFormData, setCancelPickupFormData] = useState({
    associatedAccountNumber: {
      value: "740561073",
    },
    pickupConfirmationCode: "",
    carrierCode: "FDXE",
    scheduledDate: new Date().toISOString().split("T")[0],
    location: "",
  });

  // const [returnShipmentData, setReturnShipmentData] = useState({
  //   requestedShipment: {
  //     shipper: {
  //       contact: {
  //         personName: "",
  //         phoneNumber: "",
  //       },
  //       address: {
  //         streetLines: [""],
  //         city: "",
  //         stateOrProvinceCode: "",
  //         postalCode: "",
  //         countryCode: "US",
  //       },
  //     },
  //     recipients: [
  //       {
  //         contact: {
  //           personName: "",
  //           phoneNumber: "",
  //         },
  //         address: {
  //           streetLines: [""],
  //           city: "",
  //           stateOrProvinceCode: "",
  //           postalCode: "",
  //           countryCode: "US",
  //         },
  //       },
  //     ],
  //     shipDatestamp: new Date().toISOString().split("T")[0],
  //     pickupType: "CONTACT_FEDEX_TO_SCHEDULE",
  //     serviceType: "PRIORITY_OVERNIGHT",
  //     packagingType: "FEDEX_BOX",
  //     shippingChargesPayment: {
  //       paymentType: "SENDER",
  //       payor: {
  //         responsibleParty: {
  //           accountNumber: {
  //             value: "XXX561073",
  //           },
  //         },
  //       },
  //     },
  //     shipmentSpecialServices: {
  //       specialServiceTypes: ["RETURN_SHIPMENT"],
  //       returnShipmentDetail: {
  //         returnType: "FEDEX_TAG",
  //       },
  //     },
  //     blockInsightVisibility: false,
  //     pickupDetail: {
  //       readyPickupDateTime: "",
  //       latestPickupDateTime: "",
  //     },
  //     requestedPackageLineItems: [
  //       {
  //         weight: {
  //           units: "LB",
  //           value: 5,
  //         },
  //       },
  //     ],
  //   },
  //   accountNumber: {
  //     value: "XXX561073",
  //   },
  // });

  const [cancelShipmentData, setCancelShipmentData] = useState({
    accountNumber: {
      value: "XXX561073",
    },
    trackingNumber: "",
  });

  console.log(pickupFormData);

  const logisticsStats = [
    {
      title: "Active Shipments",
      value: "24",
      icon: <FaTruck />,
      color: "blue",
      change: "+5",
    },
    {
      title: "In Warehouse",
      value: "156",

      icon: <FaWarehouse />,
      color: "green",
      change: "+12",
    },
    {
      title: "Pending Orders",
      value: "38",
      icon: <FaBoxOpen />,
      color: "yellow",
      change: "-3",
    },
    {
      title: "Delivery Success",
      value: "98%",
      icon: <FaShippingFast />,
      color: "purple",
      change: "+2%",
    },
  ];

  useEffect(() => {
    // Fetch shipments
    console.log("User ID: ", user?.id);    

    axios
      .get(`http://localhost:3000/logistics/shipments/${user?.id}`)
      .then((response) => {
        setShipments(response.data.data);
        console.log("shipments: ",response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  // Add this CSS at the beginning of your component
  const scrollbarHiddenStyles = {
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* IE and Edge */,
    "&::-webkit-scrollbar": {
      display: "none" /* Chrome, Safari and Opera */,
    },
  };

  const handlePickupSubmit = (e) => {
    e.preventDefault();
    // Add your logic to submit pickup form
    console.log(pickupFormData);
    const toastId = toast.loading("Creating Pickup...", { duration: Infinity });

    axios
      .post(`http://localhost:3000/logistics/create-pickup/${user?.id}`, pickupFormData)
      .then((response) => {
        console.log(response);
        // Show success message or redirect to tracking page
        setShowPickupModal(false);
        toast.success("Pickup Created!!", { id: toastId, duration: 3000 });

        // Reset form data
        setPickupFormData({
          associatedAccountNumber: {
            value: "740561073",
          },
          originDetail: {
            pickupLocation: {
              contact: {
                personName: "",
                phoneNumber: "",
              },
              address: {
                streetLines: [""],
                city: "",
                stateOrProvinceCode: "",
                postalCode: "",
                countryCode: "IN",
              },
            },
            readyDateTimestamp: new Date().toISOString(),
            customerCloseTime: "17:00:00",
          },
          carrierCode: "FDXE",
        });
      })
      .catch((error) => {
        toast.error("There was some error. Please try again!!", {
          id: toastId,
          duration: 3000,
        });
        console.log(error);
      });
  };

  // const handleReturnShipmentSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/logistics/return-shipment",
  //       returnShipmentData
  //     );
  //     console.log(response.data);
  //     setShowReturnShipmentModal(false);
  //   } catch (error) {
  //     console.error("Error creating return shipment:", error);
  //   }
  // };

  const handleCancelShipmentSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Cancelling Shipment...", {
      duration: Infinity,
    });
    try {
      const response = await axios.put(
        "http://localhost:3000/logistics/cancel-shipment",
        cancelShipmentData
      );
      toast.success("Shipment Cancelled!!", { id: toastId, duration: 3000 });
      console.log(response.data);
      setShowCancelShipmentModal(false);
      setCancelShipmentData((prev) => ({
        ...prev,
        trackingNumber: "",
      }));
    } catch (error) {
      toast.error("Could not cancel shipment. Please try again!", {
        id: toastId,
        duration: 3000,
      });
      console.error("Error canceling shipment:", error);
    }
  };

  const handleShipment = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creating Shipment...", {
      duration: Infinity,
    });
    try {
      const response = await axios.post(
        `http://localhost:3000/logistics/create-shipment/${user?.id}`,
        formData
      );
      toast.success("Shipment Created!!", { id: toastId, duration: 3000 });
      setShowAddModal(false);
      setFormData((prev) => ({
        ...prev,
        labelResponseOptions: "URL_ONLY",
        requestedShipment: {
          shipper: {
            contact: {
              personName: "ash",
              phoneNumber: "1122334455",
            },
            address: {
              streetLines: ["nkl"],
              city: "Memphis",
              stateOrProvinceCode: "TN",
              postalCode: "38116",
              countryCode: "US",
            },
          },
          recipients: [
            {
              contact: {
                personName: "",
                phoneNumber: "",
              },
              address: {
                streetLines: [""],
                city: "",
                stateOrProvinceCode: "",
                postalCode: "",
                countryCode: "IN",
              },
            },
          ],
          shipDatestamp: new Date().toISOString().split("T")[0],
          serviceType: "INTERNATIONAL_PRIORITY",
          packagingType: "YOUR_PACKAGING",
          pickupType: "USE_SCHEDULED_PICKUP",
          shippingChargesPayment: {
            paymentType: "SENDER",
          },
          labelSpecification: {
            imageType: "PDF",
            labelStockType: "PAPER_85X11_TOP_HALF_LABEL",
          },
          customsClearanceDetail: {
            dutiesPayment: {
              paymentType: "SENDER",
            },
            commodities: [
              {
                description: "",
                countryOfManufacture: "",
                quantity: 1,
                quantityUnits: "PCS",
                unitPrice: {
                  amount: 0,
                  currency: "USD",
                },
                customsValue: {
                  amount: 0,
                  currency: "USD",
                },
                weight: {
                  units: "LB",
                  value: 0,
                },
              },
            ],
          },
          shippingDocumentSpecification: {
            shippingDocumentTypes: ["COMMERCIAL_INVOICE"],
            commercialInvoiceDetail: {
              documentFormat: {
                stockType: "PAPER_LETTER",
                docType: "PDF",
              },
            },
          },
          requestedPackageLineItems: [
            {
              weight: {
                units: "LB",
                value: 0,
              },
            },
          ],
        },
        accountNumber: {
          value: "740561073",
        },
      }));
    } catch (error) {
      toast.error("An error occurred. Please try again!!", {
        id: toastId,
        duration: 3000,
      });
      console.log(error);
    }
  };

  const renderShipmentForm = () => (
    <form onSubmit={handleShipment} className="px-6 py-4">
      <div className="space-y-6">
        {/* Recipient Details */}
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Recipient Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                value={
                  formData.requestedShipment.recipients[0].contact.personName
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requestedShipment: {
                      ...prev.requestedShipment,
                      recipients: [
                        {
                          ...prev.requestedShipment.recipients[0],
                          contact: {
                            ...prev.requestedShipment.recipients[0].contact,
                            personName: e.target.value,
                          },
                        },
                      ],
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={
                  formData.requestedShipment.recipients[0].contact.phoneNumber
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requestedShipment: {
                      ...prev.requestedShipment,
                      recipients: [
                        {
                          ...prev.requestedShipment.recipients[0],
                          contact: {
                            ...prev.requestedShipment.recipients[0].contact,
                            phoneNumber: parseInt(e.target.value),
                          },
                        },
                      ],
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Recipient Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                placeholder="Street Address"
                required
                value={
                  formData.requestedShipment.recipients[0].address
                    .streetLines[0]
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requestedShipment: {
                      ...prev.requestedShipment,
                      recipients: [
                        {
                          ...prev.requestedShipment.recipients[0],
                          address: {
                            ...prev.requestedShipment.recipients[0].address,
                            streetLines: [e.target.value],
                          },
                        },
                      ],
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                required
                value={formData.requestedShipment.recipients[0].address.city}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requestedShipment: {
                      ...prev.requestedShipment,
                      recipients: [
                        {
                          ...prev.requestedShipment.recipients[0],
                          address: {
                            ...prev.requestedShipment.recipients[0].address,
                            city: e.target.value,
                          },
                        },
                      ],
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province Code
              </label>
              <input
                type="text"
                placeholder="State Code"
                required
                value={
                  formData.requestedShipment.recipients[0].address
                    .stateOrProvinceCode
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requestedShipment: {
                      ...prev.requestedShipment,
                      recipients: [
                        {
                          ...prev.requestedShipment.recipients[0],
                          address: {
                            ...prev.requestedShipment.recipients[0].address,
                            stateOrProvinceCode: e.target.value,
                          },
                        },
                      ],
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="Postal Code"
                required
                value={
                  formData.requestedShipment.recipients[0].address.postalCode
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requestedShipment: {
                      ...prev.requestedShipment,
                      recipients: [
                        {
                          ...prev.requestedShipment.recipients[0],
                          address: {
                            ...prev.requestedShipment.recipients[0].address,
                            postalCode: e.target.value,
                          },
                        },
                      ],
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Shipment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Weight (lbs)
              </label>
              <input
                type="number"
                placeholder="Package Weight (lbs)"
                required
                value={
                  formData.requestedShipment.requestedPackageLineItems[0].weight
                    .value
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requestedShipment: {
                      ...prev.requestedShipment,
                      requestedPackageLineItems: [
                        {
                          ...prev.requestedShipment
                            .requestedPackageLineItems[0],
                          weight: {
                            ...prev.requestedShipment
                              .requestedPackageLineItems[0].weight,
                            value: Number(e.target.value),
                          },
                        },
                      ],
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Commodity Details */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-900">Commodity Details</h4>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  requestedShipment: {
                    ...prev.requestedShipment,
                    customsClearanceDetail: {
                      ...prev.requestedShipment.customsClearanceDetail,
                      commodities: [
                        ...prev.requestedShipment.customsClearanceDetail
                          .commodities,
                        {
                          description: "",
                          countryOfManufacture: "",
                          quantity: 1,
                          quantityUnits: "PCS",
                          unitPrice: { amount: 0, currency: "USD" },
                          customsValue: { amount: 0, currency: "USD" },
                          weight: { units: "LB", value: 0 },
                        },
                      ],
                    },
                  },
                }))
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
            >
              Add Commodity
            </button>
          </div>

          {formData.requestedShipment.customsClearanceDetail.commodities.map(
            (commodity, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium text-gray-700">
                    Commodity {index + 1}
                  </h5>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          requestedShipment: {
                            ...prev.requestedShipment,
                            customsClearanceDetail: {
                              ...prev.requestedShipment.customsClearanceDetail,
                              commodities:
                                prev.requestedShipment.customsClearanceDetail.commodities.filter(
                                  (_, i) => i !== index
                                ),
                            },
                          },
                        }))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Commodity description"
                      required
                      value={commodity.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          requestedShipment: {
                            ...prev.requestedShipment,
                            customsClearanceDetail: {
                              ...prev.requestedShipment.customsClearanceDetail,
                              commodities:
                                prev.requestedShipment.customsClearanceDetail.commodities.map(
                                  (c, i) =>
                                    i === index
                                      ? { ...c, description: e.target.value }
                                      : c
                                ),
                            },
                          },
                        }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country of Manufacture
                    </label>
                    <input
                      type="text"
                      placeholder="Country Code (e.g., US)"
                      required
                      value={commodity.countryOfManufacture}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          requestedShipment: {
                            ...prev.requestedShipment,
                            customsClearanceDetail: {
                              ...prev.requestedShipment.customsClearanceDetail,
                              commodities:
                                prev.requestedShipment.customsClearanceDetail.commodities.map(
                                  (c, i) =>
                                    i === index
                                      ? {
                                          ...c,
                                          countryOfManufacture: e.target.value,
                                        }
                                      : c
                                ),
                            },
                          },
                        }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={commodity.quantity}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          requestedShipment: {
                            ...prev.requestedShipment,
                            customsClearanceDetail: {
                              ...prev.requestedShipment.customsClearanceDetail,
                              commodities:
                                prev.requestedShipment.customsClearanceDetail.commodities.map(
                                  (c, i) =>
                                    i === index
                                      ? {
                                          ...c,
                                          quantity: Number(e.target.value),
                                        }
                                      : c
                                ),
                            },
                          },
                        }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Price (USD)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      // step="1"
                      value={commodity.unitPrice.amount}
                      onChange={(e) => {
                        const amount = Number(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          requestedShipment: {
                            ...prev.requestedShipment,
                            customsClearanceDetail: {
                              ...prev.requestedShipment.customsClearanceDetail,
                              commodities:
                                prev.requestedShipment.customsClearanceDetail.commodities.map(
                                  (c, i) =>
                                    i === index
                                      ? {
                                          ...c,
                                          unitPrice: {
                                            amount,
                                            currency: "USD",
                                          },
                                          customsValue: {
                                            amount,
                                            currency: "USD",
                                          },
                                        }
                                      : c
                                ),
                            },
                          },
                        }));
                      }}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (LB)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.1"
                      value={commodity.weight.value}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          requestedShipment: {
                            ...prev.requestedShipment,
                            customsClearanceDetail: {
                              ...prev.requestedShipment.customsClearanceDetail,
                              commodities:
                                prev.requestedShipment.customsClearanceDetail.commodities.map(
                                  (c, i) =>
                                    i === index
                                      ? {
                                          ...c,
                                          weight: {
                                            units: "LB",
                                            value: Number(e.target.value),
                                          },
                                        }
                                      : c
                                ),
                            },
                          },
                        }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-white border-t px-6 py-4 rounded-b-xl">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Create Shipment
          </button>
        </div>
      </div>
    </form>
  );

  const renderPickupForm = () => (
    <form onSubmit={handlePickupSubmit} className="px-6 py-4">
      <div className="space-y-6">
        {/* Address Details */}
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Pickup Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                placeholder="Contact Name for Pickup"
                required
                value={
                  pickupFormData.originDetail.pickupLocation.contact.personName
                }
                onChange={(e) =>
                  setPickupFormData((prev) => ({
                    ...prev,
                    originDetail: {
                      ...prev.originDetail,
                      pickupLocation: {
                        ...prev.originDetail.pickupLocation,
                        contact: {
                          ...prev.originDetail.pickupLocation.contact,
                          personName: e.target.value,
                        },
                      },
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={
                  pickupFormData.originDetail.pickupLocation.contact.phoneNumber
                }
                onChange={(e) =>
                  setPickupFormData((prev) => ({
                    ...prev,
                    originDetail: {
                      ...prev.originDetail,
                      pickupLocation: {
                        ...prev.originDetail.pickupLocation,
                        contact: {
                          ...prev.originDetail.pickupLocation.contact,
                          phoneNumber: e.target.value,
                        },
                      },
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                placeholder="Street Address"
                required
                value={
                  pickupFormData.originDetail.pickupLocation.address
                    .streetLines[0]
                }
                onChange={(e) =>
                  setPickupFormData((prev) => ({
                    ...prev,
                    originDetail: {
                      ...prev.originDetail,
                      pickupLocation: {
                        ...prev.originDetail.pickupLocation,
                        address: {
                          ...prev.originDetail.pickupLocation.address,
                          streetLines: [e.target.value],
                        },
                      },
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                required
                value={pickupFormData.originDetail.pickupLocation.address.city}
                onChange={(e) =>
                  setPickupFormData((prev) => ({
                    ...prev,
                    originDetail: {
                      ...prev.originDetail,
                      pickupLocation: {
                        ...prev.originDetail.pickupLocation,
                        address: {
                          ...prev.originDetail.pickupLocation.address,
                          city: e.target.value,
                        },
                      },
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province Code
              </label>
              <input
                type="text"
                placeholder="State Code"
                required
                value={
                  pickupFormData.originDetail.pickupLocation.address
                    .stateOrProvinceCode
                }
                onChange={(e) =>
                  setPickupFormData((prev) => ({
                    ...prev,
                    originDetail: {
                      ...prev.originDetail,
                      pickupLocation: {
                        ...prev.originDetail.pickupLocation,
                        address: {
                          ...prev.originDetail.pickupLocation.address,
                          stateOrProvinceCode: e.target.value,
                        },
                      },
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                placeholder="Postal Code"
                required
                value={
                  pickupFormData.originDetail.pickupLocation.address.postalCode
                }
                onChange={(e) =>
                  setPickupFormData((prev) => ({
                    ...prev,
                    originDetail: {
                      ...prev.originDetail,
                      pickupLocation: {
                        ...prev.originDetail.pickupLocation,
                        address: {
                          ...prev.originDetail.pickupLocation.address,
                          postalCode: e.target.value,
                        },
                      },
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Timing Details */}
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Pickup Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Close Time
              </label>
              <input
                type="time"
                required
                value={pickupFormData.originDetail.customerCloseTime}
                onChange={(e) =>
                  setPickupFormData((prev) => ({
                    ...prev,
                    originDetail: {
                      ...prev.originDetail,
                      customerCloseTime: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-white border-t px-6 py-4 mt-6 rounded-b-xl">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowPickupModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Schedule Pickup
          </button>
        </div>
      </div>
    </form>
  );

  // const renderReturnShipmentForm = () => (
  //   <form onSubmit={handleReturnShipmentSubmit} className="px-6 py-4">
  //     <div className="space-y-6">
  //       {/* Shipper Information */}
  //       <div className="border rounded-lg p-4 space-y-4">
  //         <h4 className="font-medium text-gray-900">Shipper Information</h4>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Name
  //             </label>
  //             <input
  //               type="text"
  //               required
  //               value={
  //                 returnShipmentData.requestedShipment.shipper.contact
  //                   .personName
  //               }
  //               onChange={(e) =>
  //                 setReturnShipmentData((prev) => ({
  //                   ...prev,
  //                   requestedShipment: {
  //                     ...prev.requestedShipment,
  //                     shipper: {
  //                       ...prev.requestedShipment.shipper,
  //                       contact: {
  //                         ...prev.requestedShipment.shipper.contact,
  //                         personName: e.target.value,
  //                       },
  //                     },
  //                   },
  //                 }))
  //               }
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Phone
  //             </label>
  //             <input
  //               type="tel"
  //               required
  //               value={
  //                 returnShipmentData.requestedShipment.shipper.contact
  //                   .phoneNumber
  //               }
  //               onChange={(e) =>
  //                 setReturnShipmentData((prev) => ({
  //                   ...prev,
  //                   requestedShipment: {
  //                     ...prev.requestedShipment,
  //                     shipper: {
  //                       ...prev.requestedShipment.shipper,
  //                       contact: {
  //                         ...prev.requestedShipment.shipper.contact,
  //                         phoneNumber: e.target.value,
  //                       },
  //                     },
  //                   },
  //                 }))
  //               }
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           {/* Add address fields similarly */}
  //         </div>
  //       </div>

  //       {/* Pickup Details */}
  //       <div className="border rounded-lg p-4 space-y-4">
  //         <h4 className="font-medium text-gray-900">Pickup Schedule</h4>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Ready Time
  //             </label>
  //             <input
  //               type="datetime-local"
  //               required
  //               onChange={(e) =>
  //                 setReturnShipmentData((prev) => ({
  //                   ...prev,
  //                   requestedShipment: {
  //                     ...prev.requestedShipment,
  //                     pickupDetail: {
  //                       ...prev.requestedShipment.pickupDetail,
  //                       readyPickupDateTime: new Date(
  //                         e.target.value
  //                       ).toISOString(),
  //                     },
  //                   },
  //                 }))
  //               }
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Latest Pickup Time
  //             </label>
  //             <input
  //               type="datetime-local"
  //               required
  //               onChange={(e) =>
  //                 setReturnShipmentData((prev) => ({
  //                   ...prev,
  //                   requestedShipment: {
  //                     ...prev.requestedShipment,
  //                     pickupDetail: {
  //                       ...prev.requestedShipment.pickupDetail,
  //                       latestPickupDateTime: new Date(
  //                         e.target.value
  //                       ).toISOString(),
  //                     },
  //                   },
  //                 }))
  //               }
  //               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
  //             />
  //           </div>
  //         </div>
  //       </div>

  //       {/* Package Details */}
  //       <div className="border rounded-lg p-4 space-y-4">
  //         <h4 className="font-medium text-gray-900">Package Details</h4>
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">
  //             Weight (LB)
  //           </label>
  //           <input
  //             type="number"
  //             required
  //             value={
  //               returnShipmentData.requestedShipment
  //                 .requestedPackageLineItems[0].weight.value
  //             }
  //             onChange={(e) =>
  //               setReturnShipmentData((prev) => ({
  //                 ...prev,
  //                 requestedShipment: {
  //                   ...prev.requestedShipment,
  //                   requestedPackageLineItems: [
  //                     {
  //                       ...prev.requestedShipment.requestedPackageLineItems[0],
  //                       weight: {
  //                         ...prev.requestedShipment.requestedPackageLineItems[0]
  //                           .weight,
  //                         value: Number(e.target.value),
  //                       },
  //                     },
  //                   ],
  //                 },
  //               }))
  //             }
  //             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     {/* Form Actions */}
  //     <div className="bg-white border-t px-6 py-4 mt-6">
  //       <div className="flex justify-end gap-4">
  //         <button
  //           type="button"
  //           onClick={() => setShowReturnShipmentModal(false)}
  //           className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
  //         >
  //           Cancel
  //         </button>
  //         <button
  //           type="submit"
  //           className="px-4 py-2 bg-blue-500 text-white rounded-lg"
  //         >
  //           Create Return Shipment
  //         </button>
  //       </div>
  //     </div>
  //   </form>
  // );

  const cancelPickup = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:3000/logistics/cancel-pickup",
        cancelPickupFormData
      )
      .then((response) => {
        console.log(response);
        setShowCancelPickupModal(false);
        // Reset form
        setCancelPickupFormData({
          associatedAccountNumber: {
            value: "740561073",
          },
          pickupConfirmationCode: "",
          carrierCode: "FDXE",
          scheduledDate: new Date().toISOString().split("T")[0],
          location: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderCancelPickupForm = () => (
    <form onSubmit={cancelPickup} className="px-6 py-4">
      <div className="space-y-6">
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Cancel Pickup Details</h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Confirmation Code
              </label>
              <input
                type="text"
                required
                value={cancelPickupFormData.pickupConfirmationCode}
                onChange={(e) =>
                  setCancelPickupFormData((prev) => ({
                    ...prev,
                    pickupConfirmationCode: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Date
              </label>
              <input
                type="date"
                required
                value={cancelPickupFormData.scheduledDate}
                onChange={(e) =>
                  setCancelPickupFormData((prev) => ({
                    ...prev,
                    scheduledDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                required
                value={cancelPickupFormData.location}
                onChange={(e) =>
                  setCancelPickupFormData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-white border-t px-6 py-4 mt-6 rounded-b-xl">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowCancelPickupModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Close
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cancel Pickup
          </button>
        </div>
      </div>
    </form>
  );

  const renderCancelShipmentForm = () => (
    <form onSubmit={handleCancelShipmentSubmit} className="px-6 py-4">
      <div className="space-y-6">
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Cancel Shipment Details</h4>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number
              </label>
              <input
                type="text"
                required
                placeholder="Enter tracking number"
                value={cancelShipmentData.trackingNumber}
                onChange={(e) =>
                  setCancelShipmentData((prev) => ({
                    ...prev,
                    trackingNumber: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="bg-white border-t px-6 py-4 mt-6">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowCancelShipmentModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cancel Shipment
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="relative min-h-screen">
      <DashboardBackground />

      {/* Main Content */}
      <div className="relative z-10 space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Logistics Management
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <FaDownload />
            Export Report
          </motion.button>
        </div>

        {/* create shipment and pickup */}
        <div className="flex justify-between">
          <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            className={`bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border text-center`}
            onClick={() => setShowAddModal(true)}
          >
            Create a new shipment
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            className={`bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border text-center`}
            onClick={() => setShowPickupModal(true)}
          >
            Create a new pickup
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            className={`bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border text-center`}
            onClick={() => setShowCancelPickupModal(true)}
          >
            Cancel an exising pickup
          </motion.div>
          {/* <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border text-center"
            onClick={() => setShowReturnShipmentModal(true)}
          >
            Create Return Shipment
          </motion.div> */}
          <motion.div
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border text-center"
            onClick={() => setShowCancelShipmentModal(true)}
          >
            Cancel Shipment
          </motion.div>
        </div>

        {/* create shipment form */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6"
              onClick={() => setShowAddModal(false)}
              style={scrollbarHiddenStyles}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl mb-6"
                onClick={(e) => e.stopPropagation()}
              >
                {renderShipmentForm()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* create pickup form */}
        <AnimatePresence>
          {showPickupModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6"
              onClick={() => setShowPickupModal(false)}
              style={scrollbarHiddenStyles}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl mb-6"
                onClick={(e) => e.stopPropagation()}
              >
                {renderPickupForm()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* cancel pickup form */}
        <AnimatePresence>
          {showCancelPickupModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6"
              onClick={() => setShowCancelPickupModal(false)}
              style={scrollbarHiddenStyles}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl mb-6"
                onClick={(e) => e.stopPropagation()}
              >
                {renderCancelPickupForm()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* return shipment form */}
        {/* <AnimatePresence>
          {showReturnShipmentModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6"
              onClick={() => setShowReturnShipmentModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {renderReturnShipmentForm()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* cancel shipment form */}
        <AnimatePresence>
          {showCancelShipmentModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6"
              onClick={() => setShowCancelShipmentModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {renderCancelShipmentForm()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {logisticsStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className={`bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-${stat.color}-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <span
                    className={`text-sm ${
                      stat.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                  <span className={`text-${stat.color}-500 text-xl`}>
                    {stat.icon}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shipments Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left py-3 px-4">Shipment ID</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Destination</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments &&
                  shipments.length > 0 &&
                  shipments.map((shipment) => (
                    <motion.tr
                      key={shipment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                      }}
                      className="border-t"
                    >
                      <td className="py-3 px-4">{shipment.trackingNumber}</td>
                      <td className="py-3 px-4">{shipment.product}</td>
                      <td className="py-3 px-4">{shipment.customerName}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-red-500" />
                          {shipment.destination}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            shipment.status === "in-transit"
                              ? "bg-blue-100 text-blue-600"
                              : shipment.status === "delivered"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {"in-transit"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map View Placeholder */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100 h-[400px] flex items-center justify-center">
          <p className="text-gray-500">Shipment Tracking Map View</p>
        </div>
      </div>
    </div>
  );
};

export default SellerLogistics;

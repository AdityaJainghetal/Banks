import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const GeneralDetails = ({ onNext }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  const initialValues = {
    addressLegal:
      "PROPERTY AT PLOT NO.147 IS SITUATED GRAM-PATLONA(BIJORI), PH NO.18, GRAM PANCHAYAT-BIJORI, TEHSIL AND DIST- SEHORE, MP 466001",
    addressSite:
      "PROPERTY AT PLOT NO.147 IS SITUATED GRAM-PATLONA(BIJORI), PH NO.18, GRAM PANCHAYAT-BIJORI, TEHSIL AND DIST- SEHORE, MP 466001",
    nearbyLandmark: "NEAR GOVT.SCHOOL",
    projectPinCode: "466001",
    zone: "RESIDENTIAL",
    projectState: "MADHYAPRADESH",
    nameOnSocietyBoard: "ANY",
    nameOnDoor: "ANY",
    latitude: "23.235495",
    longitude: "77.076638",
    populationCensus2011: "ANY",
    ruralUrban: "Rural",
    statusOfOccupancy: "Under Construction",
    occupiedBy: "ANY",
    usageOfProperty: "ANY",
    eraApplicable: "No",
    ownershipType: "Freehold",
    numberAndDate: "",
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      setImage(info.file.originFileObj || info.file);
    }
  };

  const handleSubmit = (values) => {
    const fullData = { ...values, image };

    onNext(fullData);
    toast.success("Saved Successfully");
  };

  return (
    <div className='max-w-5xl mx-auto p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-6'>General Details</h2>

      <Form
        layout='vertical'
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        className='grid grid-cols-1 lg:grid-cols-2 gap-4'
      >
        <Form.Item
          name='addressLegal'
          label='Address as per Legal Document'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='addressSite'
          label='Address As per Site'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='nearbyLandmark' label='Nearby Landmark'>
          <Input />
        </Form.Item>

        <Form.Item name='projectPinCode' label='Project Pin Code'>
          <Input />
        </Form.Item>

        <Form.Item name='zone' label='Zone' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name='projectState'
          label='Project State'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='nameOnSocietyBoard' label='Name on Society Board'>
          <Input />
        </Form.Item>

        <Form.Item name='nameOnDoor' label='Name on Door of the Premises'>
          <Input />
        </Form.Item>

        <Form.Item
          name='latitude'
          label='Latitude'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='longitude'
          label='Longitude'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='populationCensus2011'
          label='Population as per Census 2011'
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='ruralUrban'
          label='Rural/Urban'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='statusOfOccupancy'
          label='Status of Occupancy'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='occupiedBy' label='Occupied By'>
          <Input />
        </Form.Item>

        <Form.Item name='usageOfProperty' label='Usage of the Property'>
          <Input />
        </Form.Item>

        <Form.Item name='eraApplicable' label='RERA (if applicable)'>
          <Input />
        </Form.Item>

        <Form.Item
          name='ownershipType'
          label='Ownership Type'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='numberAndDate' label='Number & Date'>
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* <Form.Item className='lg:col-span-2' label='Upload Image'>
          <Upload
            listType='picture'
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt='Preview'
              className='w-24 mt-2'
            />
          )}
        </Form.Item> */}

        <Form.Item className='lg:col-span-2 text-end'>
          <Button type='primary' htmlType='submit'>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralDetails;

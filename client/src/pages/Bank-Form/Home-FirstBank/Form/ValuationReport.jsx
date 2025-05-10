import dayjs from "dayjs";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Button, Upload, DatePicker, Select } from "antd";
import toast from "react-hot-toast";

const { TextArea } = Input;
const { Option } = Select;

const ValuationReport = ({ onNext }) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);

  const initialValues = {
    customerName: "Mr. Jivnial Singh",
    customerNo: "9644983608",
    personMetDuringVisit: "Mr. Phool Singh Ji",
    personContactNo: "9644983608",
    typeOfLoan: "Own Plot + SeCo",
    dateOfReport: dayjs("2025-01-13", "YYYY-MM-DD"),
    refNo: "123456789",
    evaluationType: "One Off",
    unitType: "Individual House",
    documentsAvailable: "CO-OWNERSHIP DEED, LAYOUT, MAP",
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      setImage(info.file.originFileObj || info.file);
    }
  };

  const handleSubmit = (values) => {
    const fullData = {
      ...values,
      dateOfReport: values.dateOfReport?.format("DD.MM.YYYY"),
      image,
    };
    onNext(fullData);
    toast.success("Saved Successfully");
  };

  return (
    <div className='max-w-6xl p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-6'>Valuation Report</h2>

      <Form
        layout='vertical'
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
        className='grid grid-cols-1 lg:grid-cols-2 gap-4'
      >
        <Form.Item
          name='customerName'
          label='Customer Name'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='customerNo'
          label='Customer No.'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='personMetDuringVisit'
          label='Person Met During Visit'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='personContactNo'
          label='Person Contact No.'
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='typeOfLoan' label='Type of Loan'>
          <Input />
        </Form.Item>

        <Form.Item name='dateOfReport' label='Date of Report'>
          <DatePicker className='w-full' format='DD.MM.YYYY' />
        </Form.Item>

        <Form.Item name='refNo' label='Reference No.'>
          <Input />
        </Form.Item>

        <Form.Item name='evaluationType' label='Evaluation Type'>
          <Select allowClear>
            <Option value='One Off'>One Off</Option>
            <Option value='Regular'>Regular</Option>
          </Select>
        </Form.Item>

        <Form.Item name='unitType' label='Unit Type'>
          <Select allowClear>
            <Option value='Individual House'>Individual House</Option>
            <Option value='Flat'>Flat</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='documentsAvailable'
          label='Documents Available'
          className='lg:col-span-2'
        >
          <TextArea rows={2} />
        </Form.Item>

        {/* <Form.Item name='image' label='Upload Image' className='lg:col-span-2'>
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
          <Button type='primary' htmlType='submit' className='mt-4'>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ValuationReport;

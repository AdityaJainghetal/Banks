import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

const { Option } = Select;

const PropertyDetails = ({ onNext }) => {
  const [form] = Form.useForm();

  const initialValues = {
    directions: {
      North: "ROAD",
      South: "ROAD",
      East: "MUD HOUSE OF RAM SINGH JI",
      West: "MUD HOUSE OF JEEVAN LAL",
    },
    boundariesMatching: "Yes",
    plotArea: 900,
    isPropertyWithinLimit: "Gram panchayat (GP)",
    marketability: "Yes",
    typeOfStructure: "Residential",
    qualityOfConstruction: "Residential",
    unitFlatConfiguration: "Residential",
    noOfFloorsPermissible: "Residential",
    noOfUnitFlatOnEachFloor: "Residential",
    noOfFloorsActual: "",
    approxAgeOfProperty: 0,
    residualAge: 50,
    liftAvailable: "No",
    constructionStage: "Plinth",
  };

  useEffect(() => {
    // onNext(form.getFieldsValue());
  }, []);

  const handleFinish = (values) => {
    onNext(values);
    toast.success("Saved Successfully");
  };

  const handleFieldChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value;
    form.setFieldsValue({ [name]: parsedValue });
  };

  return (
    <div className='max-w-5xl mx-auto p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-6'>Property Details</h2>

      <Form
        layout='vertical'
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
        className='grid grid-cols-1 lg:grid-cols-2 gap-4'
      >
        {/* Directions */}
        {["North", "South", "East", "West"].map((dir) => (
          <Form.Item
            key={dir}
            label={dir}
            name={["directions", dir]}
            rules={[{ required: true }]}
          >
            <Input onChange={handleFieldChange} />
          </Form.Item>
        ))}

        {/* Boundaries Matching */}
        <Form.Item label='Boundaries Matching' name='boundariesMatching'>
          <Select onChange={handleFieldChange}>
            <Option value='Yes'>Yes</Option>
            <Option value='No'>No</Option>
            <Option value='NA'>NA</Option>
          </Select>
        </Form.Item>

        {/* Plot Area */}
        <Form.Item label='Plot Area (Sq. ft)' name='plotArea'>
          <Input type='number' onChange={handleFieldChange} />
        </Form.Item>

        {/* Property Location */}
        <Form.Item
          label='Is the property within which limit'
          name='isPropertyWithinLimit'
        >
          <Input onChange={handleFieldChange} />
        </Form.Item>

        {/* Marketability */}
        <Form.Item label='Marketability' name='marketability'>
          <Select onChange={handleFieldChange}>
            <Option value='Yes'>Yes</Option>
            <Option value='No'>No</Option>
            <Option value='NA'>NA</Option>
          </Select>
        </Form.Item>

        {/* Structure Info */}
        <Form.Item label='Type of Structure' name='typeOfStructure'>
          <Input onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item label='Quality of Construction' name='qualityOfConstruction'>
          <Input onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item
          label='Unit / Flat Configuration'
          name='unitFlatConfiguration'
        >
          <Input onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item
          label='No. of Floors Permissible'
          name='noOfFloorsPermissible'
        >
          <Input onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item
          label='No. of Unit / Flat on Each Floor'
          name='noOfUnitFlatOnEachFloor'
        >
          <Input onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item label='No. of Floors Actual' name='noOfFloorsActual'>
          <Input onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item
          label='Approx. Age of Property (Years)'
          name='approxAgeOfProperty'
        >
          <Input type='number' onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item label='Residual Age (Years)' name='residualAge'>
          <Input type='number' onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item label='Lift Available' name='liftAvailable'>
          <Select onChange={handleFieldChange}>
            <Option value='Yes'>Yes</Option>
            <Option value='No'>No</Option>
            <Option value='NA'>NA</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Construction Stage' name='constructionStage'>
          <Input onChange={handleFieldChange} />
        </Form.Item>

        <Form.Item className='lg:col-span-2 text-end'>
          <Button type='primary' htmlType='submit'>
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropertyDetails;

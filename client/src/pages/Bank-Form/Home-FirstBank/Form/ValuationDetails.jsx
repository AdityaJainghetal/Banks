import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import toast from "react-hot-toast";

const ValuationDetails = ({ onNext }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    document: 900,
    landAreaPlan: 0,
    landAreaSite: 900,
    landAreaGF: 500,
    builtUpAreaFF: 0,
    builtUpAreaSF: 0,
    landAreaForValuation: 900,
    landRate: 300,
    totalLandValuation: 270000,
    constructionAreaForValuation: 500,
    constructionRate: 1200,
    totalConstructionValuation: 600000,
    fairMarketValue: 870000,
    valueAfterCompletion: 870000,
    presentStageValuation: 390000,
    govtGuidelineValuation: 112,
  });

  // Auto calculations when inputs change
  useEffect(() => {
    const totalLandValuation =
      formData.landAreaForValuation * formData.landRate;
    const totalConstructionValuation =
      formData.constructionAreaForValuation * formData.constructionRate;
    const fairMarketValue = totalLandValuation + totalConstructionValuation;

    setFormData((prev) => ({
      ...prev,
      totalLandValuation,
      totalConstructionValuation,
      fairMarketValue,
    }));
  }, [
    formData.landAreaForValuation,
    formData.landRate,
    formData.constructionAreaForValuation,
    formData.constructionRate,
  ]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (values) => {
    onNext(formData);
    toast.success("Saved Successfully");
  };

  return (
    <div className='max-w-5xl mx-auto p-6 bg-white rounded shadow'>
      <h2 className='text-2xl font-bold mb-6'>Valuation Details</h2>

      <Form
        layout='vertical'
        form={form}
        initialValues={formData}
        onFinish={handleSubmit}
        className='grid grid-cols-1 lg:grid-cols-2 gap-4'
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Document'
              name='document'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.document}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Land Area (Sq. ft) Plan' name='landAreaPlan'>
              <Input
                type='number'
                value={formData.landAreaPlan}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Land Area (Sq. ft) Site'
              name='landAreaSite'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.landAreaSite}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Land Area (Sq. ft) GF' name='landAreaGF'>
              <Input
                type='number'
                value={formData.landAreaGF}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label='Built Up Area (Proposed) FF' name='builtUpAreaFF'>
              <Input
                type='number'
                value={formData.builtUpAreaFF}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Built Up Area (Proposed) SF' name='builtUpAreaSF'>
              <Input
                type='number'
                value={formData.builtUpAreaSF}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Land Area for Valuation'
              name='landAreaForValuation'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.landAreaForValuation}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Land Rate per sq. ft.'
              name='landRate'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.landRate}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Total Land Valuation'
              name='totalLandValuation'
              disabled
            >
              <Input type='number' value={formData.totalLandValuation} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Construction Area for Valuation'
              name='constructionAreaForValuation'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.constructionAreaForValuation}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Construction Rate per sq. ft.'
              name='constructionRate'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.constructionRate}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Total Construction Valuation'
              name='totalConstructionValuation'
              disabled
            >
              <Input
                type='number'
                value={formData.totalConstructionValuation}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Fair Market Value'
              name='fairMarketValue'
              disabled
            >
              <Input type='number' value={formData.fairMarketValue} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Value After Completion'
              name='valueAfterCompletion'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.valueAfterCompletion}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Present Stage Valuation'
              name='presentStageValuation'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.presentStageValuation}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Govt. Guideline Valuation'
              name='govtGuidelineValuation'
              rules={[{ required: true }]}
            >
              <Input
                type='number'
                value={formData.govtGuidelineValuation}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className='lg:col-span-2 text-end'>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ValuationDetails;


import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';

const Formulario = () => {
  const [formData, setFormData] = useState({
    campo1: '',
    campo2: '',
    campo3: '',
    campo4: '',
    campo5: ''
  });

  const [invalidFields, setInvalidFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Remove o campo da lista de inválidos ao começar a digitar
    if (invalidFields.includes(name)) {
      setInvalidFields(invalidFields.filter(field => field !== name));
    }
  };

  const handleSubmit = () => {
    const requiredFields = ['campo1', 'campo2', 'campo3'];
    const newInvalidFields = requiredFields.filter(field => !formData[field]);

    if (newInvalidFields.length > 0) {
      setInvalidFields(newInvalidFields);
      window.alert("Por favor, preencha todos os campos obrigatórios!");
    } else {
      window.alert("CONCLUÍDO");
    }
  };

  const renderTooltip = (description) => (
    <Tooltip>
      {description}
    </Tooltip>
  );

  return (
    <Form>
      {[
        { name: 'campo1', label: 'Campo 1', description: 'Descrição do Campo 1', required: true },
        { name: 'campo2', label: 'Campo 2', description: 'Descrição do Campo 2', required: true },
        { name: 'campo3', label: 'Campo 3', description: 'Descrição do Campo 3', required: true },
        { name: 'campo4', label: 'Campo 4', description: 'Descrição do Campo 4' },
        { name: 'campo5', label: 'Campo 5', description: 'Descrição do Campo 5' }
      ].map((field, index) => (
        <Form.Group key={index} controlId={field.name}>
          <Form.Label>
            {field.label} {field.required && <span className="text-danger">*</span>}
            <OverlayTrigger placement="right" overlay={renderTooltip(field.description)}>
              <Button variant="info" size="sm" className="ml-2">i</Button>
            </OverlayTrigger>
          </Form.Label>
          <Form.Control
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className={invalidFields.includes(field.name) ? 'is-invalid' : ''}

          />
        </Form.Group>
      ))}

      <Button variant="success" className="mt-3" onClick={handleSubmit}>
        CONCLUÍDO
      </Button>

      <style jsx>{`
        .is-invalid {
          border-color: red;
        }
      `}</style>
    </Form>
  );
};

export default Formulario;

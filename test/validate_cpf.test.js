const validate_cpf = require('../lib/validate_cpf');

describe('validate_cpf', () => {
  describe('when CPF is valid', () => {
    describe('and contain only numbers', () => {
      const cpf_input = '52998224725';

      it('should return true', () => {
        expect(validate_cpf(cpf_input)).to.be.true;
      });
    });

    describe('and has the format xxx.xxx.xxx-xx', () => {
      const cpf_input = '529.982.247-25';

      it('should return true', () => {
        expect(validate_cpf(cpf_input)).to.be.true;
      });
    });

    describe('and is a number', () => {
      const cpf_input = 52998224725;

      it('should return true', () => {
        expect(validate_cpf(cpf_input)).to.be.true;
      });
    });
  });

  describe('when CPF is all equal', () => {
    const cpf_input = '111.111.111-11';

    it('should return false', () => {
      expect(validate_cpf(cpf_input)).to.be.false;
    });
  });

  describe('when CPF is invalid', () => {
    const cpf_input = '123.456.789-12';

    it('should return false', () => {
      expect(validate_cpf(cpf_input)).to.be.false;
    });
  });
});

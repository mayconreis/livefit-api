import environment from '@src/config/environment';

export default class StringHelper {
  static async generateReference(prefix: string, id: number): Promise<string> {
    const yearString = new Date().toLocaleDateString('pt-BR', {
      year: '2-digit',
    });

    const lengthFormatId = environment.application.reference.length;
    const idLength = String(id).length;
    const repeatZero = lengthFormatId >= idLength ? lengthFormatId - idLength : 0;
    const referenceFormatted = `${'0'.repeat(repeatZero)}${String(id)}`;

    return `${prefix}-${yearString}-${referenceFormatted}`;
  }

  static toUpper = (value: string) => value.toUpperCase();

  static trim = (value: string) => value.trim();
}

export interface ECertificateEntity<Original = unknown> {
  getOriginal: () => Original;
  getValidity: () => {
    from: Date;
    to: Date;
  };
  getSerialNumber: () => string;
  getIndividual: () => {
    fullName: string;
    pinfl: string;
    tin: string;
  };
}

export class ECertificate<Original = unknown>
  implements ECertificateEntity<Original>
{
  private readonly original: Original;
  private readonly validFrom: Date;
  private readonly validTo: Date;
  private readonly serialNumber: string;
  private readonly individual: {
    fullName: string;
    pinfl: string;
    tin: string;
  };

  constructor(args: {
    original: Original;
    validFrom: Date;
    validTo: Date;
    serialNumber: string;
    individual: {
      fullName: string;
      pinfl: string;
      tin: string;
    };
  }) {
    this.original = args.original;
    this.validFrom = args.validFrom;
    this.validTo = args.validTo;
    this.serialNumber = args.serialNumber;
    this.individual = args.individual;
  }

  getIndividual() {
    return this.individual;
  }

  getOriginal() {
    return this.original;
  }

  getValidity() {
    return {
      from: this.validFrom,
      to: this.validTo,
    };
  }
  getSerialNumber() {
    return this.serialNumber;
  }
}

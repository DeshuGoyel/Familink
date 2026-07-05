import { User, Asset, Guardian, Heir } from '../store/useStore';
import { CheckinSettings } from '../store/useCheckinStore';

export class UserBuilder {
  private user: User = {
    name: 'Jane Doe',
    email: 'jane.doe@secured-estate.org',
    avatar: null,
    score: 85,
    plan: 'Family',
    nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    checkInHistory: [
      { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), method: 'App Tap' }
    ],
    jurisdiction: 'global'
  };

  withName(name: string): this {
    this.user.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withScore(score: number): this {
    this.user.score = score;
    return this;
  }

  withJurisdiction(jurisdiction: string): this {
    this.user.jurisdiction = jurisdiction;
    return this;
  }

  build(): User {
    return { ...this.user };
  }

  static invalid(): Partial<User> {
    return {
      name: '',
      email: 'invalid-email-format',
      score: -10
    };
  }
}

export class AssetBuilder {
  private asset: Asset = {
    id: 'asset-' + Math.random().toString(36).substring(2, 9),
    name: 'Hardware Ledger Cold Storage',
    type: 'Crypto',
    status: 'Secured',
    value: 250000,
    date: new Date().toLocaleDateString(),
    tags: ['crypto', 'cold-storage'],
    notes: 'Ledger Nano X in safety deposit box.',
    instructions: 'Unlock with pin 4920. Retrieve seed words from safe.',
    beneficiaryId: 'heir-123',
    encryptionLevel: 'Quantum-Resistant',
    growthRate: 0.05
  };

  withId(id: string): this {
    this.asset.id = id;
    return this;
  }

  withName(name: string): this {
    this.asset.name = name;
    return this;
  }

  withType(type: string): this {
    this.asset.type = type;
    return this;
  }

  withValue(value: number): this {
    this.asset.value = value;
    return this;
  }

  withInstructions(instructions: string): this {
    this.asset.instructions = instructions;
    return this;
  }

  withBeneficiaryId(beneficiaryId: string): this {
    this.asset.beneficiaryId = beneficiaryId;
    return this;
  }

  build(): Asset {
    return { ...this.asset };
  }

  static invalid(): Partial<Asset> {
    return {
      name: '',
      type: '',
      value: -500
    };
  }
}

export class GuardianBuilder {
  private guardian: Guardian = {
    id: 'guardian-' + Math.random().toString(36).substring(2, 9),
    name: 'Sarah Chen',
    email: 'sarah.chen@trustednode.net',
    status: 'Confirmed',
    relationship: 'Fiduciary Attorney'
  };

  withId(id: string): this {
    this.guardian.id = id;
    return this;
  }

  withName(name: string): this {
    this.guardian.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.guardian.email = email;
    return this;
  }

  withStatus(status: 'Pending' | 'Confirmed'): this {
    this.guardian.status = status;
    return this;
  }

  build(): Guardian {
    return { ...this.guardian };
  }

  static buildMany(count: number): Guardian[] {
    const list: Guardian[] = [];
    for (let i = 0; i < count; i++) {
      list.push(
        new GuardianBuilder()
          .withId(`guardian-${i + 1}`)
          .withName(`Guardian Node ${i + 1}`)
          .withEmail(`node${i + 1}@trustees.org`)
          .build()
      );
    }
    return list;
  }

  static invalid(): Partial<Guardian> {
    return {
      name: '',
      email: 'bad-email'
    };
  }
}

export class HeirBuilder {
  private heir: Heir = {
    id: 'heir-' + Math.random().toString(36).substring(2, 9),
    name: 'Emily Asha',
    email: 'emily.asha@nextgen.com',
    relation: 'Daughter',
    status: 'Not Notified',
    progress: 0
  };

  withId(id: string): this {
    this.heir.id = id;
    return this;
  }

  withName(name: string): this {
    this.heir.name = name;
    return this;
  }

  withEmail(email: string): this {
    this.heir.email = email;
    return this;
  }

  build(): Heir {
    return { ...this.heir };
  }

  static invalid(): Partial<Heir> {
    return {
      name: '',
      email: 'notanemail'
    };
  }
}

export class CheckinSettingsBuilder {
  private settings: CheckinSettings = {
    frequency: 'weekly',
    consecutiveMissesAllowed: 3,
    currentStreak: 5,
    totalMissed: 1,
    alertGuardiansAfterMisses: 2,
    lastCheckinAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active'
  };

  withFrequency(frequency: 'weekly' | 'biweekly' | 'monthly'): this {
    this.settings.frequency = frequency;
    return this;
  }

  withConsecutiveMissesAllowed(allowed: number): this {
    this.settings.consecutiveMissesAllowed = allowed;
    return this;
  }

  withStatus(status: 'active' | 'alert_sent' | 'recovery_triggered'): this {
    this.settings.status = status;
    return this;
  }

  build(): CheckinSettings {
    return { ...this.settings };
  }
}

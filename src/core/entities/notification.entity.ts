export interface NotificationEntity {
  hasTaskOwnerName: () => boolean;
  hasAvatarLink: () => boolean;
  getId: () => string;
  getTitle: () => string;
  getLink: () => string;
  getDate: () => string;
  getAvatarLink: () => string;
}

export class Notification implements NotificationEntity {
  private readonly id: string;
  private readonly title: string;
  private readonly link: string;
  private readonly date: string;
  private readonly avatarLink: string;
  private readonly status: "READ" | "SENT";
  private readonly taskOwner: {
    fullName?: string;
    staffId: string;
  };

  constructor(data: {
    id: string;
    title: string;
    link: string;
    date: string;
    avatarLink: string;
    taskOwner: {
      fullName?: string;
      staffId: string;
    };
    status: "READ" | "SENT";
  }) {
    this.id = data.id;
    this.title = data.title;
    this.link = data.link;
    this.date = data.date;
    this.avatarLink = data.avatarLink;
    this.taskOwner = data.taskOwner;
    this.status = data.status;
  }

  hasTaskOwnerName() {
    return this.taskOwner?.fullName !== undefined;
  }

  hasAvatarLink() {
    return (
      this.avatarLink !== undefined &&
      this.avatarLink !== "" &&
      this.avatarLink !== null
    );
  }

  getTaskOwner() {
    return this.taskOwner;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getLink() {
    return this.link;
  }

  getDate() {
    return this.date;
  }

  getAvatarLink() {
    return `https://smart-office.uz/uploads/images/${this.avatarLink}`;
  }
}

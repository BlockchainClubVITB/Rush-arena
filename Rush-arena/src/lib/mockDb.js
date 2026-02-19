const STORAGE_KEY = 'rush_arena_data';

const initialData = {
  participants: [
    // Seeding some initial data for testing/demo
    {
      hash_id: 'RA-DEMO1',
      name: 'Test Student',
      reg_no: '2024CS001',
      mobile: '9876543210',
      email: 'student@university.edu',
      events: {
        event_1_win: false, event_2_win: false, event_3_win: false,
        event_4_win: false, event_5_win: false, event_6_win: false,
        event_7_win: false, event_8_win: false, event_9_win: false,
        event_10_win: false, event_11_win: false, event_12_win: false,
      }
    }
  ]
};

export const mockDb = {
  getData: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialData;
  },

  saveData: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  getParticipants: () => {
    return mockDb.getData().participants;
  },

  getParticipantByIdentifier: (identifier) => {
    const participants = mockDb.getParticipants();
    const upperId = identifier.toUpperCase();
    return participants.find(p =>
      p.hash_id.toUpperCase() === upperId ||
      p.reg_no.toUpperCase() === upperId
    );
  },

  updateParticipantEvents: (hash_id, eventStatuses) => {
    const data = mockDb.getData();
    const index = data.participants.findIndex(p => p.hash_id === hash_id);
    if (index !== -1) {
      data.participants[index].events = {
        ...data.participants[index].events,
        ...eventStatuses
      };
      mockDb.saveData(data);
      return data.participants[index];
    }
    return null;
  }
};

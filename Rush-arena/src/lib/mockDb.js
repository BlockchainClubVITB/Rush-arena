const STORAGE_KEY = 'rush_arena_data_v2'; // New key for the updated schema

const initialData = {
  participants: [
    {
      hash_id: 'RA-A1B2C3',
      name: 'Aditya Verma',
      reg_no: '2024RA001',
      mobile: '9876543210',
      email: 'aditya@university.edu',
      event_1_win: false, event_2_win: false, event_3_win: false,
      event_4_win: false, event_5_win: false, event_6_win: false,
      event_7_win: false, event_8_win: false, event_9_win: false,
      bull_riding_win: false,
      body_zorbing_win: false,
      speed_dating_win: false
    },
    {
      hash_id: 'RA-X9Y8Z7',
      name: 'Isha Sharma',
      reg_no: '2024RA042',
      mobile: '9123456789',
      email: 'isha@university.edu',
      event_1_win: true, event_2_win: false, event_3_win: true,
      event_4_win: false, event_5_win: false, event_6_win: false,
      event_7_win: false, event_8_win: false, event_9_win: false,
      bull_riding_win: true,
      body_zorbing_win: false,
      speed_dating_win: false
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
    const cleanId = identifier.trim().toUpperCase();
    return participants.find(p =>
      p.hash_id.toUpperCase() === cleanId ||
      p.reg_no.toUpperCase() === cleanId
    );
  },

  updateParticipantEvents: (hash_id, winStatuses) => {
    const data = mockDb.getData();
    const index = data.participants.findIndex(p => p.hash_id === hash_id);
    if (index !== -1) {
      data.participants[index] = {
        ...data.participants[index],
        ...winStatuses
      };
      mockDb.saveData(data);
      return data.participants[index];
    }
    return null;
  }
};

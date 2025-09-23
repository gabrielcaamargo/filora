// Mock data storage
const mockData: Record<string, Record<string, any>> = {};

// Mock document reference
const createMockDocumentReference = (
  collectionPath: string,
  docId: string
) => ({
  id: docId,
  path: `${collectionPath}/${docId}`,
  set: jest
    .fn()
    .mockImplementation((data: any, options?: { merge?: boolean }) => {
      if (!mockData[collectionPath]) {
        mockData[collectionPath] = {};
      }

      if (options?.merge && mockData[collectionPath][docId]) {
        mockData[collectionPath][docId] = {
          ...mockData[collectionPath][docId],
          ...data,
        };
      } else {
        mockData[collectionPath][docId] = data;
      }

      return Promise.resolve();
    }),
  get: jest.fn().mockImplementation(() => {
    const data = mockData[collectionPath]?.[docId];
    return Promise.resolve({
      id: docId,
      exists: !!data,
      data: () => data,
      ref: createMockDocumentReference(collectionPath, docId),
    });
  }),
  update: jest.fn().mockImplementation((data: any) => {
    if (!mockData[collectionPath]) {
      mockData[collectionPath] = {};
    }

    mockData[collectionPath][docId] = {
      ...mockData[collectionPath][docId],
      ...data,
    };

    return Promise.resolve();
  }),
  delete: jest.fn().mockImplementation(() => {
    if (mockData[collectionPath] && mockData[collectionPath][docId]) {
      delete mockData[collectionPath][docId];
    }
    return Promise.resolve();
  }),
});

// Mock collection reference
const createMockCollectionReference = (collectionPath: string) => ({
  id: collectionPath,
  path: collectionPath,
  doc: jest.fn().mockImplementation((docId?: string) => {
    const id = docId || `mock-doc-${Date.now()}-${Math.random()}`;
    return createMockDocumentReference(collectionPath, id);
  }),
  add: jest.fn().mockImplementation((data: any) => {
    const docId = `mock-doc-${Date.now()}-${Math.random()}`;
    const docRef = createMockDocumentReference(collectionPath, docId);
    docRef.set(data);
    return Promise.resolve(docRef);
  }),
  get: jest.fn().mockImplementation(() => {
    const collectionData = mockData[collectionPath] || {};
    const docs = Object.entries(collectionData).map(([id, data]) => ({
      id,
      exists: true,
      data: () => data,
      ref: createMockDocumentReference(collectionPath, id),
    }));

    return Promise.resolve({
      docs,
      empty: docs.length === 0,
      size: docs.length,
      forEach: (callback: (doc: any) => void) => docs.forEach(callback),
    });
  }),
  where: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue({
      docs: [],
      empty: true,
      size: 0,
      forEach: jest.fn(),
    }),
  })),
  orderBy: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue({
      docs: [],
      empty: true,
      size: 0,
      forEach: jest.fn(),
    }),
  })),
  limit: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue({
      docs: [],
      empty: true,
      size: 0,
      forEach: jest.fn(),
    }),
  })),
});

// Mock Firestore instance
const mockFirestore = {
  collection: jest
    .fn()
    .mockImplementation((collectionPath: string) =>
      createMockCollectionReference(collectionPath)
    ),
  doc: jest.fn().mockImplementation((docPath: string) => {
    const pathParts = docPath.split("/");
    const docId = pathParts.pop()!;
    const collectionPath = pathParts.join("/");
    return createMockDocumentReference(collectionPath, docId);
  }),
  batch: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    commit: jest.fn().mockResolvedValue(undefined),
  })),
  runTransaction: jest.fn().mockImplementation((callback) =>
    Promise.resolve(
      callback({
        get: jest.fn().mockResolvedValue({
          exists: false,
          data: () => undefined,
        }),
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })
    )
  ),
  settings: jest.fn(),
  enableNetwork: jest.fn().mockResolvedValue(undefined),
  disableNetwork: jest.fn().mockResolvedValue(undefined),
  clearPersistence: jest.fn().mockResolvedValue(undefined),
  terminate: jest.fn().mockResolvedValue(undefined),
  waitForPendingWrites: jest.fn().mockResolvedValue(undefined),
};

// Mock FieldValue
const mockFieldValue = {
  serverTimestamp: jest.fn().mockReturnValue("__SERVER_TIMESTAMP__"),
  delete: jest.fn().mockReturnValue("__DELETE__"),
  increment: jest
    .fn()
    .mockImplementation((value: number) => `__INCREMENT_${value}__`),
  arrayUnion: jest
    .fn()
    .mockImplementation(
      (...elements: any[]) => `__ARRAY_UNION_${JSON.stringify(elements)}__`
    ),
  arrayRemove: jest
    .fn()
    .mockImplementation(
      (...elements: any[]) => `__ARRAY_REMOVE_${JSON.stringify(elements)}__`
    ),
};

// Main firestore function with proper typing
const firestore = Object.assign(
  jest.fn().mockImplementation(() => mockFirestore),
  {
    FieldValue: mockFieldValue,
  }
);

// Export individual methods for direct imports
export const FieldValue = mockFieldValue;

// Default export
export default firestore;

// Helper function to clear mock data (useful for tests)
export const clearMockData = () => {
  Object.keys(mockData).forEach((key) => {
    delete mockData[key];
  });
};

// Helper function to set mock data (useful for tests)
export const setMockData = (
  collectionPath: string,
  docId: string,
  data: any
) => {
  if (!mockData[collectionPath]) {
    mockData[collectionPath] = {};
  }
  mockData[collectionPath][docId] = data;
};

// Helper function to get mock data (useful for tests)
export const getMockData = (collectionPath?: string, docId?: string) => {
  if (!collectionPath) return mockData;
  if (!docId) return mockData[collectionPath] || {};
  return mockData[collectionPath]?.[docId];
};

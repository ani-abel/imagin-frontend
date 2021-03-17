import { AlbumContentResponse, ImagenAppState, OperationStatus } from '../models/imagen.model';
import { ImagenAction, ImagenActionType } from '../actions/imagen.actions';
import { setUserDataToLocalStorage } from '../../utils/shared.functions';

const initialAppState: ImagenAppState = {
  IsLoading: false,
  ApiMessage: undefined,
  CurrentFolderId: undefined,
  Error: undefined,
  DriveSpace: undefined,
  UserDetails: undefined,
  IsAuthorized: false,
  PictureList: [],
  SearchResults: [],
  SearchQuery: undefined,
  AlbumList: [],
  CurrentFilePath: "/",
  CurrentModal: undefined,
  SelectedPicture: undefined
};

export function ImagenReducer(
  state: ImagenAppState = initialAppState,
  action: ImagenAction
) {
  switch (action.type) {
    default: {
      return state;
    }
    case ImagenActionType.AUTHORIZE_USER: {
      return {
        ...state,
        UserDetails: action.payload,
        IsAuthorized: true
      };
    }
    case ImagenActionType.ADD_NEW_ALBUM: {
      return {
        ...state,
        AlbumList: [...state.AlbumList, action.payload]
      };
    }
    case ImagenActionType.OPEN_ALBUM: {
      //? Reset file path
      return {
        ...state,
        CurrentFilePath: `/${action.payload.FolderName}`,
        CurrentFolderId: action.payload
      };
    }
    case ImagenActionType.GET_ALBUM_LIST_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.GET_ALBUM_LIST_SUCCESSFUL: {
      return {
        ...state,
        AlbumList: [...action.payload],
        IsLoading: false
      };
    }
    case ImagenActionType.GET_ALBUM_LIST_FAILED: {
      return {
        ...state,
        Error: action.payload
      };
    }
    case ImagenActionType.GET_DRIVE_SPACE_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.GET_DRIVE_SPACE_SUCCESSFUL: {
      return {
        ...state,
        DriveSpace: action.payload,
        IsLoading: false
      };
    }
    case ImagenActionType.GET_DRIVE_SPACE_FAILED: {
      return {
        ...state,
        Error: action.payload,
        IsLoading: false
      };
    }
    case ImagenActionType.GET_ALBUM_CONTENT_INITIATED: {
      return {
        ...state,
        CurrentFolderId: action.payload,
        IsLoading: true
      };
    }
    case ImagenActionType.GET_ALBUM_CONTENT_SUCCESSFUL: {
      return {
        ...state,
        PictureList: [...action.payload],
        IsLoading: false
      };
    }
    case ImagenActionType.GET_ALBUM_CONTENT_FAILED: {
      return {
        ...state,
        IsLoading: false,
        Error: action.payload
      };
    }
    case ImagenActionType.CLEAR_SEARCH_RESULTS: {
      return {
        ...state,
        SearchResults: [],
        SearchQuery: undefined
      };
    }
    case ImagenActionType.SEARCH_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.SEARCH_FAILED: {
      return {
        ...state,
        Error: action.payload,
        IsLoading: false
      };
    }
    case ImagenActionType.SEARCH_SUCCESSFUL: {
      return {
        ...state,
        SearchResults: action.payload,
        IsLoading: false
      };
    }
    case ImagenActionType.CREATE_ALBUM_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.CREATE_ALBUM_FAILED: {
      return {
        ...state,
        IsLoading: false,
        Error: action.payload
      };
    }
    case ImagenActionType.CREATE_ALBUM_SUCCESSFUL: {
      return {
        ...state,
        AlbumList: [...state.AlbumList, action.payload],
        IsLoading: false,
        ApiMessage: {
          Message: "Album created",
          OperationType: OperationStatus.SUCCESSFULL
        }
      };
    }
    case ImagenActionType.DELETE_PICTURE_INITIATED: {
      //- Filter out the object that was selected for deletion
      const filteredList = state["PictureList"].filter((picture: AlbumContentResponse) => picture.FileId != action.payload);
      return {
        ...state,
        IsLoading: true,
        PictureList: filteredList
      };
    }
    case ImagenActionType.DELETE_PICTURE_FAILED: {
      return {
        ...state,
        IsLoading: false,
        Error: action.payload
      };
    }
    case ImagenActionType.DELETE_PICTURE_SUCCESSFUL: {
      return {
        ...state,
        ApiMessage: action.payload,
        IsLoading: false
      };
    }
    case ImagenActionType.DOWNLOAD_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.DOWNLOAD_FAILED: {
      return {
        ...state,
        Error: action.payload,
        IsLoading: false
      };
    }
    case ImagenActionType.DOWNLOAD_SUCCESSFUL: {
      return {
        ...state,
        IsLoading: false
      };
    }
    case ImagenActionType.EMPTY_TRASH_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.EMPTY_TRASH_FAILED: {
      return {
        ...state,
        IsLoading: false,
        Error: action.payload
      };
    }
    case ImagenActionType.EMPTY_TRASH_SUCCESSFUL: {
      return {
        ...state,
        IsLoading: false,
        ApiMessage: action.payload
      };
    }
    case ImagenActionType.UPLOAD_PICTURE_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.UPLOAD_PICTURE_FAILED: {
      return {
        ...state,
        IsLoading: false,
        Error: action.payload
      };
    }
    case ImagenActionType.UPLOAD_PICTURE_SUCCESSFUL: {
      return {
        ...state,
        IsLoading: false,
        PictureList: [...state.PictureList, ...action.payload],
        ApiMessage: {
          Message: "Pictures uploaded successfully",
          OperationType: OperationStatus.SUCCESSFULL
        }
      };
    }
    case ImagenActionType.GET_USER_DATA_INITIATED: {
      return {
        ...state,
        IsLoading: true
      };
    }
    case ImagenActionType.GET_USER_DATA_SUCCESSFUL: {
      //?- Save the user details to localStorage after they are gotten
      setUserDataToLocalStorage(action.payload);
      return {
        ...state,
        IsLoading: false,
        UserDetails: action.payload
      };
    }
    case ImagenActionType.GET_USER_DATA_FAILED: {
      return {
        ...state,
        IsLoading: false,
        Error: action.payload
      };
    }
    case ImagenActionType.CLEAR_API_MESSAGE: {
      return {
        ...state,
        ApiMessage: undefined
      }
    }
    case ImagenActionType.CLEAR_DRIVE_SPACE: {
      return {
        ...state,
        DriveSpace: undefined
      }
    }
    case ImagenActionType.OPEN_MODAL: {
      return {
        ...state,
        CurrentModal: action.payload
      }
    }
    case ImagenActionType.CLOSE_MODAL: {
      return {
        ...state,
        CurrentModal: undefined
      }
    }
    case ImagenActionType.SET_FILE_PATH: {
      return {
        ...state,
        CurrentFilePath: action.payload
      }
    }
    case ImagenActionType.WRITE_API_MESSAGE: {
      return {
        ...state,
        ApiMessage: action.payload
      }
    }
    case ImagenActionType.SELECT_PICTURE: {
      return {
        ...state,
        SelectedPicture: action.payload
      }
    }
  }
}

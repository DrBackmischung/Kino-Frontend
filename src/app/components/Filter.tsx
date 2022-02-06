import React from "react";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    FormControlLabel,
    FormGroup, FormLabel, Radio, RadioGroup,
    Rating,
    Select
} from "@mui/material";
import {styled} from "@mui/styles";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import "./Filter.css";

const BootstrapDialog = styled(Dialog)(({theme}) => ({}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};


function Filter(props: any) {
    const {
        setSelectedLanguage,
        setSelectedFSK,
        setSelectedGenre,
        setApplyFilters,
        setRatingValue,
    } = props;

    const {moviesData, selectedGenre, ratingValue} = props;

    const [open, setOpen] = React.useState(false);

    //Dialog Window functionality: open, close, apply Filters
    const handleClickOpen = () => {
        setOpen(true);
        setApplyFilters(false);
        setSelectedLanguage([]);
        setSelectedGenre([]);
        setSelectedFSK([]);
        setRatingValue([]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApplyFilters = () => {
        setApplyFilters(true);
        setOpen(false);
    }

    //Events Handling for existing Filters
    function handleCheckboxSelect(e: any) {
        if (e.target.checked) {
            setSelectedLanguage((prevValues: any) => prevValues?.concat(e.target.value));
        } else {
            setSelectedLanguage((prevValues: any) =>
                prevValues.filter((item: any) => item !== e.target.value)
            );
        }
    }

    function handleFskRadioButtonSelect(e: any) {
        if (e.target.checked) {
            setSelectedFSK(e.target.value);
        }
    }

    function handleSelectGenreChange(e: any) {
        setSelectedGenre(e.target.value);
    }

    //Arrays preparation (existing options for filtering)
    const originalGenresArray = moviesData?.map((item: any) => item.genre);
    let genresString = originalGenresArray.toString();
    let genresStringArray = genresString.split(",");
    const genresStringArrayToLowerCase = genresStringArray?.map((item: any) => item.toLowerCase());
    const uniqueGenresArray = genresStringArrayToLowerCase.filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    const originalLanguagesArray = moviesData?.map((item: any) => item.language);
    const uniqueLanguagesArray = originalLanguagesArray.filter((value: any, index: any, self: any) => self.indexOf(value) === index);

    const FSKIndex = [0, 6, 12, 16, 18];


    return (
        <div>
            <IconButton id="filter-iconButton" size="large" onClick={handleClickOpen}>
                <FilterAltIcon/>
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Filter
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sprache</FormLabel>
                        <FormGroup className="filter__checkboxes">
                            <div className="filter__checkboxes">
                                <div className="filter__checkboxes-column">
                                    <div className="checkboxes">
                                        {uniqueLanguagesArray?.map(
                                            (language: any) =>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            key={language}
                                                            value={language}
                                                            onChange={(e) => handleCheckboxSelect(e)}
                                                        />
                                                    }
                                                    label={language}
                                                />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">FSK</FormLabel>
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group" className="fsk-select">
                            {FSKIndex?.map((index: any) => (
                                <FormControlLabel key={index} value={index} control={<Radio/>} label={'ab ' + index}
                                                  onChange={(e) => handleFskRadioButtonSelect(e)}/>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className="genre-select">
                        <FormLabel component="legend" id="simple-select-genre-label">Genre</FormLabel>
                        <Select
                            labelId="simple-select-genre-label"
                            id="simple-genre-select"
                            defaultValue={""}
                            value={selectedGenre}
                            onChange={(e) => handleSelectGenreChange(e)}
                            label="genre"
                            className="genre-select-window"
                        >
                            {uniqueGenresArray?.map((genre: any) => (
                                <MenuItem key={genre} value={genre}> {genre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl component="fieldset" className="rating-select">
                        <FormLabel component="legend" className="rating-select">Rating</FormLabel>
                        <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            precision={0.5}
                            size="large"
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleApplyFilters}>
                        Filter anwenden
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default Filter;
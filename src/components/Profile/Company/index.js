import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import ReactTags from "react-tag-autocomplete";
import "./index.css";
import MySelect from "../../Custom/MySelect";
import {
  ISO,
  COMPANY_TYPES,
  SESSION_LOGGED_COMPANY,
  stringWithUnitFromNumber,
  SESSION_LANG,
} from "../../../utils";
import ImageCropper from "../../ImageCropper";
import { requestAPI } from "../../../utils/api";
import SpinnerView from "../../SpinnerView";
import Lang from "../../Lang";
import { STRINGS } from "../../../utils/strings";

const IMAGE_COVER = { ratio: 1200 / 240, maxWidth: 1200, circle: false };
const IMAGE_LOGO = { ratio: 1, maxWidth: 300, circle: true };
const IMAGE_PRODUCT = { ratio: 2, maxWidth: 800, circle: false };

// const SUB_MENUS = [STRINGS.aboutUs, STRINGS.productSearvice, STRINGS.contacts];

const INTRO_MAX_LENGTH = 1200;
const WHATWEDO_MAX_LENGTH = 1200;

const MAX_TAGS = 7;
let lang = sessionStorage.getItem(SESSION_LANG);
export default class ProfileCompany extends Component {
  constructor(props) {
    super(props);

    let tags = [];
    let tagsIt = [];
    props.profile.tags &&
      props.profile.tags.en &&
      props.profile.tags.en.forEach((tag) => {
        tags.push({ name: tag });
      });
    props.profile.tags &&
      props.profile.tags.it &&
      props.profile.tags.it.forEach((tag) => {
        tagsIt.push({ name: tag });
      });

    let selectedISO = [];
    if (props.profile && props.profile.iso) {
      for (let i in props.profile.iso) {
        for (let j in ISO) {
          if (ISO[j].label === props.profile.iso[i]) {
            selectedISO.push(ISO[j]);
            break;
          }
        }
      }
    }

    let selectedType = COMPANY_TYPES().filter(
      (type) => type.value === props.profile.type
    );
    selectedType = selectedType.length ? selectedType[0] : null;

    let productPhotos = [];
    props.profile.product &&
      props.profile.product.photos &&
      props.profile.product.photos.length &&
      props.profile.product.photos.forEach((photo) => {
        productPhotos.push(process.env.REACT_APP_AWS_PREFIX + photo);
      });

    let originPhotos = {
      background: props.profile.background
        ? process.env.REACT_APP_AWS_PREFIX + props.profile.background
        : null,
      logo: props.profile.logo
        ? process.env.REACT_APP_AWS_PREFIX + props.profile.logo
        : null,
      productPhotos: productPhotos,
    };
    this.state = {
      selectedISO: selectedISO,
      selectedType: selectedType,
      tags: tags,
      tagsIt: tagsIt,
      tagsPlaceholder: STRINGS.typeToAdd,
      tagsItPlaceholder: STRINGS.typeToAdd,
      targetToCrop: null,
      originPhotos: originPhotos,
      coverImage: originPhotos.background,
      logoImage: originPhotos.logo,
      productImages: originPhotos.productPhotos.slice(0),
      isProcessing: false,
      selectedAboutUsLang: lang ? lang : "en",
      selectedProductLang: lang ? lang : "en",

      introLength: null,
      introItLength: null,
      whatWeDoLength: null,
      whatWeDoItLength: null,

      hintEmployees:
        props.profile && props.profile.employees
          ? stringWithUnitFromNumber(props.profile.employees)
          : "",
      hintRevenues:
        props.profile && props.profile.revenues
          ? stringWithUnitFromNumber(props.profile.revenues)
          : "",
    };

    this.aboutUsPanel = React.createRef();
    this.productsPanel = React.createRef();
    this.contactsPanel = React.createRef();

    this.refBrowse = React.createRef();
    this.refIntro = React.createRef();
    this.refIntroIt = React.createRef();
    this.refWhatWeDo = React.createRef();
    this.refWhatWeDoIt = React.createRef();
    this.refEmployee = React.createRef();
    this.refRevenue = React.createRef();
    this.refProductName = React.createRef();
    this.refProductNameIt = React.createRef();
    this.refProductDetail = React.createRef();
    this.refProductDetailIt = React.createRef();
    this.refAddress = React.createRef();
    this.refPhone = React.createRef();
    this.refWebsite = React.createRef();
    this.refEmail = React.createRef();
    this.ref2ndEmail = React.createRef();
  }

  componentDidMount = () => {
    if (this.state.tags.length >= MAX_TAGS) {
      let elem = document.querySelector(".tags-en .react-tags__search-input");
      if (elem) {
        elem.style.display = "none";
      }
    }
    if (this.state.tagsIt.length >= MAX_TAGS) {
      let elem = document.querySelector(".tags-it .react-tags__search-input");
      if (elem) {
        elem.style.display = "none";
      }
    }

    if (lang === "en") {
      document.querySelector(".tags-it").style.display = "none";
    } else {
      document.querySelector(".tags-en").style.display = "none";
    }

    this.setState({ introLength: this.refIntro.current.value.length });
    this.setState({ introItLength: this.refIntroIt.current.value.length });
    this.setState({ whatWeDoLength: this.refWhatWeDo.current.value.length });
    this.setState({
      whatWeDoItLength: this.refWhatWeDoIt.current.value.length,
    });

    this.resetTagsPlaceholder(this.state.tags, "en");
    this.resetTagsPlaceholder(this.state.tagsIt, "it");
  };

  componentWillReceiveProps = (props) => {
    if (this.props.tab !== props.tab) {
      let maxHeight = this.aboutUsPanel.current.offsetHeight;
      if (maxHeight > 0) {
        this.productsPanel.current.style.height = this.contactsPanel.current.style.height =
          maxHeight + "px";
      }
    }

    let types = COMPANY_TYPES();

    types.forEach((elem) => {
      if (
        this.state.selectedType &&
        elem.value === this.state.selectedType.value
      ) {
        this.setState({ selectedType: elem });
      }
    });

    this.resetTagsPlaceholder(this.state.tags, "en");
    this.resetTagsPlaceholder(this.state.tagsIt, "it");
  };

  handleChangeTab = (index) => {
    let maxHeight = this.aboutUsPanel.current.offsetHeight;
    if (maxHeight > 0) {
      this.productsPanel.current.style.height = this.contactsPanel.current.style.height =
        maxHeight + "px";
    }
    this.setState({ selectedTab: index });
  };

  handleClickSave = async (e) => {
    const {
      originPhotos,
      coverImage,
      logoImage,
      productImages,
      tags,
      tagsIt,
      selectedISO,
      selectedType,
    } = this.state;
    const { profile } = this.props;

    let newTags = [];
    let newTagsIt = [];
    tags &&
      tags.forEach((tag) => {
        newTags.push(tag.name);
      });
    tagsIt &&
      tagsIt.forEach((tagIt) => {
        newTagsIt.push(tagIt.name);
      });

    let employees = parseInt(this.refEmployee.current.value);
    if (!employees) {
      employees = 0;
    }

    let revenues = parseInt(this.refRevenue.current.value);
    if (!revenues) {
      revenues = 0;
    }
    let arrayISO = [];
    for (let iso of selectedISO) {
      arrayISO.push(iso.label);
    }

    let dataToSave = {
      profile: {
        ...profile,
        introduction: {
          en: this.refIntro.current.value,
          it: this.refIntroIt.current.value,
        },
        whatWeDo: {
          en: this.refWhatWeDo.current.value,
          it: this.refWhatWeDoIt.current.value,
        },
        employees: employees,
        revenues: revenues,
        iso: selectedISO && arrayISO,
        type: selectedType && selectedType.value,
        tags: {
          en: newTags,
          it: newTagsIt,
        },
        contact: {
          ...profile.contact,
          address: this.refAddress.current.value,
          phone: this.refPhone.current.value,
          website: this.refWebsite.current.value,
          email: this.refEmail.current.value,
          email2nd: this.ref2ndEmail.current.value,
        },
        product: {
          name: {
            en: this.refProductName.current.value,
            it: this.refProductNameIt.current.value,
          },
          detail: {
            en: this.refProductDetail.current.value,
            it: this.refProductDetailIt.current.value,
          },
        },
      },

      imageData: {
        background: coverImage !== originPhotos.background ? coverImage : null,
        logo: logoImage !== originPhotos.logo ? logoImage : null,
      },
    };

    let removedPhotos = [];
    let prefix = process.env.REACT_APP_AWS_PREFIX;
    if (originPhotos.background) {
      let path = originPhotos.background.substr(
        originPhotos.background.search(prefix) + prefix.length,
        originPhotos.background.length
      );
      dataToSave.profile.background = path;
      if (coverImage && coverImage.search(prefix) === -1) {
        removedPhotos.push(path);
      }
    }

    if (originPhotos.logo) {
      let path = originPhotos.logo.substr(
        originPhotos.logo.search(prefix) + prefix.length,
        originPhotos.logo.length
      );
      dataToSave.profile.logo = path;
      if (logoImage && logoImage.search(prefix) === -1) {
        removedPhotos.push(path);
      }
    }

    for (let originPhoto of originPhotos.productPhotos) {
      let removed = true;
      for (let modifiedPhoto of productImages) {
        if (modifiedPhoto.search(originPhoto) !== -1) {
          removed = false;
          break;
        }
      }
      if (removed) {
        let path = originPhoto.substr(
          originPhoto.search(prefix) + prefix.length,
          originPhoto.length
        );
        removedPhotos.push(path);
      }
    }

    // dataToSave.imageData.removedPhotos = removedPhotos;

    let newImages = [];
    for (let photo of productImages) {
      let index = photo.search(prefix);
      if (index === -1) {
        newImages.push(photo);
      } else {
        newImages.push(photo.substr(index + prefix.length, photo.length));
      }
    }

    dataToSave.imageData.productPhotos = newImages;

    // console.log(dataToSave);

    this.setState({ isProcessing: true });
    let response = await requestAPI(
      `/companies/${this.props.id}`,
      "POST",
      dataToSave
    );
    let result = await response.json();
    if (result.error) {
      alert(STRINGS[result.error]);
      return;
    }

    // console.log("result---", result);

    if (result.profile.background) {
      originPhotos.background = prefix + result.profile.background;
    }
    if (result.profile.logo) {
      originPhotos.logo = prefix + result.profile.logo;
    }
    if (
      result.profile.product &&
      result.profile.product.photos &&
      result.profile.product.photos.length
    ) {
      let productPhotos = [];
      result.profile.product.photos.forEach((photo) => {
        productPhotos.push(prefix + photo);
      });

      originPhotos.productPhotos = productPhotos;
    }
    this.setState({
      originPhotos,
      coverImage: originPhotos.background,
      logoImage: originPhotos.logo,
      productImages: originPhotos.productPhotos,
    });

    sessionStorage.setItem(SESSION_LOGGED_COMPANY, JSON.stringify(result));
    this.requestRemovePhotos(removedPhotos);
  };

  requestRemovePhotos = async (photos) => {
    if (photos && photos.length) {
      let response = await requestAPI(
        "/companies/photos/remove",
        "POST",
        photos
      );
      let result = await response.json();
      if (result.error) {
        console.log(STRINGS[result.error]);
      }
    }
    this.setState({ isProcessing: false });
  };

  handleRemoveProductImage = (index) => {
    if (window.confirm(STRINGS.wantToRemove)) {
      let productImages = this.state.productImages.slice(0);
      productImages.splice(index, 1);
      this.setState({ productImages });
    }
  };

  handleISOChange = (selectedISO) => {
    this.setState({ selectedISO });
  };

  handleTypeChange = (selectedType) => {
    this.setState({ selectedType });
  };

  handleAtecoChange = (selectedAteco) => {
    this.setState({ selectedAteco });
  };

  resetTagsPlaceholder = (tags, lang) => {
    let elem = document.querySelector(
      `${lang === "en" ? ".tags-en" : ".tags-it"} .react-tags__search-input`
    );
    if (!elem) {
      return;
    }

    let placeholder = STRINGS.typeToAdd;
    if (tags && tags.length) {
      placeholder = `${STRINGS.max}:${MAX_TAGS}(${STRINGS.left}:${
        MAX_TAGS - tags.length
      })`;
    }

    elem.style.width = placeholder.length * 7 + "px";
    if (lang === "en") {
      this.setState({ tagsPlaceholder: placeholder });
    } else {
      this.setState({ tagsItPlaceholder: placeholder });
    }
  };

  handleTagDelete = (i) => {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });

    let elem = document.querySelector(".tags-en .react-tags__search-input");
    if (elem) {
      elem.style.display = "block";
      elem.focus();
    }
    this.resetTagsPlaceholder(tags, "en");
  };

  handleTagAddition = (tag) => {
    const { tags } = this.state;
    if (tags.filter((elem) => elem.name === tag.name).length) {
      return;
    }

    if (tags.length === MAX_TAGS - 1) {
      let elem = document.querySelector(".tags-en .react-tags__search-input");
      if (elem) {
        elem.style.display = "none";
      }
    }

    const newTags = [].concat(tags, tag);
    this.setState({ tags: newTags });
    this.resetTagsPlaceholder(newTags, "en");
  };

  handleTagItDelete = (i) => {
    const tagsIt = this.state.tagsIt.slice(0);
    tagsIt.splice(i, 1);
    this.setState({ tagsIt });

    let elem = document.querySelector(".tags-it .react-tags__search-input");
    if (elem) {
      elem.style.display = "block";
      elem.focus();
    }
    this.resetTagsPlaceholder(tagsIt, "it");
  };

  handleTagItAddition = (tagIt) => {
    const { tagsIt } = this.state;
    if (tagsIt.filter((elem) => elem.name === tagIt.name).length) {
      return;
    }

    if (tagsIt.length === MAX_TAGS - 1) {
      let elem = document.querySelector(".tags-it .react-tags__search-input");
      if (elem) {
        elem.style.display = "none";
      }
    }

    const newTagsIt = [].concat(tagsIt, tagIt);
    this.setState({ tagsIt: newTagsIt });
    this.resetTagsPlaceholder(newTagsIt, "it");
  };

  handleBrowseFile = (index, info) => {
    this.refBrowse.current.value = null;
    this.refBrowse.current.click();
    this.setState({
      targetToCrop: { index: index, info: info },
    });
  };

  handleChangeImage = () => {
    if (!this.refBrowse.current.files || !this.refBrowse.current.files.length) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const { targetToCrop } = this.state;
      this.setState({
        targetToCrop: {
          ...targetToCrop,
          info: {
            ...targetToCrop.info,
            image: reader.result,
          },
        },
      });
    };

    reader.readAsDataURL(this.refBrowse.current.files[0]);
  };

  handleSaveImage = (image) => {
    const { targetToCrop } = this.state;
    let imageArray = this.state.productImages;
    let that = this;
    if (targetToCrop.index === 0) {
      that.setState({ coverImage: image });
    } else if (targetToCrop.index === 1) {
      that.setState({ logoImage: image });
    } else {
      let index = targetToCrop.index - 2;

      if (imageArray.length <= index) {
        imageArray.push(image);
      } else {
        imageArray[index] = image;
      }
      that.setState({ productImages: imageArray });
    }

    that.setState({ targetToCrop: null });
  };

  handleCropCancel = () => {
    this.setState({ targetToCrop: null });
  };

  handleChangeAboutUsLang = (selectedAboutUsLang) => {
    this.setState({ selectedAboutUsLang });
    if (selectedAboutUsLang === "en") {
      document.querySelector(".tags-en").style.display = "block";
      document.querySelector(".tags-it").style.display = "none";
      this.resetTagsPlaceholder(this.state.tags, selectedAboutUsLang);
    } else {
      document.querySelector(".tags-en").style.display = "none";
      document.querySelector(".tags-it").style.display = "block";
      this.resetTagsPlaceholder(this.state.tagsIt, selectedAboutUsLang);
    }
  };

  handleChangeText = (e) => {
    if (e.target === this.refIntro.current) {
      this.setState({ introLength: e.target.value.length });
    } else if (e.target === this.refIntroIt.current) {
      this.setState({ introItLength: e.target.value.length });
    } else if (e.target === this.refWhatWeDo.current) {
      this.setState({
        whatWeDoLength: e.target.value.length,
      });
    } else if (e.target === this.refWhatWeDoIt.current) {
      this.setState({
        whatWeDoItLength: e.target.value.length,
      });
    }
  };

  handleChangeEmployees = (e) => {
    let number = parseInt(e.target.value);
    let employees = "";
    if (number) {
      employees = stringWithUnitFromNumber(number);
    }
    this.setState({ hintEmployees: employees });
  };

  handleChangeRevenues = (e) => {
    let number = parseInt(e.target.value);
    let revenues = "";
    if (number) {
      revenues = stringWithUnitFromNumber(number);
    }
    this.setState({ hintRevenues: revenues });
  };
  handleChangeProduct = (selectedProductLang) => {
    this.setState({ selectedProductLang });
  };

  render() {
    const {
      selectedISO,
      selectedType,
      tags,
      tagsIt,
      tagsPlaceholder,
      tagsItPlaceholder,
      targetToCrop,
      coverImage,
      logoImage,
      productImages,
      isProcessing,
      introLength,
      introItLength,
      whatWeDoLength,
      whatWeDoItLength,
      hintEmployees,
      hintRevenues,
      selectedAboutUsLang,
      selectedProductLang,
    } = this.state;

    const { profile, tab } = this.props;

    const btnSave = (
      <div className="d-flex justify-content-end mt-4 pb-2">
        <button style={{ minWidth: 140 }} onClick={this.handleClickSave}>
          {STRINGS.save}
        </button>
      </div>
    );

    const aboutUsPanel = (
      <div className={tab === 0 ? "d-block" : "d-none"} ref={this.aboutUsPanel}>
        <div className="py-2 d-flex align-items-center">
          {STRINGS.introduction}
          <Lang onChange={this.handleChangeAboutUsLang} />
        </div>
        <div className={selectedAboutUsLang === "en" ? "d-block" : "d-none"}>
          <TextareaAutosize
            maxLength={INTRO_MAX_LENGTH}
            ref={this.refIntro}
            defaultValue={
              profile && profile.introduction && profile.introduction.en
            }
            onChange={this.handleChangeText}
            style={{ maxHeight: 200 }}
          />
          <div className="char-limit">
            {introLength}/{INTRO_MAX_LENGTH}
          </div>
        </div>
        <div className={selectedAboutUsLang === "it" ? "d-block" : "d-none"}>
          <TextareaAutosize
            maxLength={INTRO_MAX_LENGTH}
            ref={this.refIntroIt}
            defaultValue={
              profile && profile.introduction && profile.introduction.it
            }
            onChange={this.handleChangeText}
            style={{ maxHeight: 200 }}
          />
          <div className="char-limit">
            {introItLength}/{INTRO_MAX_LENGTH}
          </div>
        </div>
        <div className="mt-4 mb-2 d-flex align-items-center">
          {STRINGS.whatWeDo}
        </div>
        <div>
          <div className={selectedAboutUsLang === "en" ? "d-block" : "d-none"}>
            <TextareaAutosize
              maxLength={WHATWEDO_MAX_LENGTH}
              ref={this.refWhatWeDo}
              defaultValue={profile && profile.whatWeDo && profile.whatWeDo.en}
              onChange={this.handleChangeText}
              style={{ maxHeight: 200 }}
            />
            <div className="char-limit">
              {whatWeDoLength}/{WHATWEDO_MAX_LENGTH}
            </div>
          </div>
          <div className={selectedAboutUsLang === "it" ? "d-block" : "d-none"}>
            <TextareaAutosize
              maxLength={WHATWEDO_MAX_LENGTH}
              ref={this.refWhatWeDoIt}
              defaultValue={profile && profile.whatWeDo && profile.whatWeDo.it}
              onChange={this.handleChangeText}
              style={{ maxHeight: 200 }}
            />
            <div className="char-limit">
              {whatWeDoItLength}/{WHATWEDO_MAX_LENGTH}
            </div>
          </div>
        </div>
        <hr />
        <div>
          {STRINGS.tags}
          <br />
          <div>
            <span className="text-small">{STRINGS.selectMainKeyword}</span>
            <div className="info-row mt-3">
              <div className="tags-en">
                <ReactTags
                  tags={tags}
                  placeholderText={tagsPlaceholder}
                  onDelete={this.handleTagDelete.bind(this)}
                  onAddition={this.handleTagAddition.bind(this)}
                  allowNew
                />
              </div>
              <div className="tags-it">
                <ReactTags
                  tags={tagsIt}
                  placeholderText={tagsItPlaceholder}
                  onDelete={this.handleTagItDelete.bind(this)}
                  onAddition={this.handleTagItAddition.bind(this)}
                  allowNew
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="tag-hint">
                {STRINGS.examples}: <label>VERNICIATURA</label>
                <label>SALDATURA</label>
                <label>ALLUMINIO</label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-3">
          <div className="info-row">
            <span>{STRINGS.nEmployees}:</span>
            <input
              ref={this.refEmployee}
              type="number"
              defaultValue={profile && profile.employees}
              onChange={this.handleChangeEmployees}
            />
            <div className="number-hint">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{hintEmployees}
            </div>
          </div>
          <div className="info-row">
            <span>{STRINGS.revenues}:</span>
            <input
              type="password"
              name="pwd"
              id="password"
              autoComplete="new-password"
              style={{ display: "none" }}
            />
            <input
              ref={this.refRevenue}
              type="number"
              defaultValue={profile && profile.revenues}
              onChange={this.handleChangeRevenues}
            />
            <div className="number-hint">€&nbsp;&nbsp;&nbsp;{hintRevenues}</div>
          </div>
          <div className="info-row">
            <span>{STRINGS.iso}:</span>
            <MySelect
              value={selectedISO}
              isMulti
              onChange={this.handleISOChange}
              options={ISO}
              width={300}
              borderColor="var(--colorBorder)"
              menuHeight={154}
              placeholder={STRINGS.select}
            />
          </div>
          <div className="info-row">
            <span>{STRINGS.companyType}:</span>
            <MySelect
              value={selectedType}
              onChange={this.handleTypeChange}
              options={COMPANY_TYPES()}
              width={300}
              borderColor="var(--colorBorder)"
              menuHeight={102}
              placeholder={STRINGS.select}
            />
          </div>
        </div>
        {btnSave}
      </div>
    );

    const productsPanel = (
      <div
        className={`pt-4 ${tab === 1 ? "d-block" : "d-none"}`}
        ref={this.productsPanel}
      >
        <div className="float-right">
          <Lang onChange={this.handleChangeProduct} />
        </div>
        <div className="info-row">
          <span className="pr-1">{STRINGS.productName}: </span>
          <div className={selectedProductLang === "en" ? "d-block" : "d-none"}>
            <input
              ref={this.refProductName}
              defaultValue={
                profile.product &&
                profile.product.name &&
                profile.product.name.en
              }
              style={{ width: 300 }}
            />
          </div>
          <div className={selectedProductLang === "it" ? "d-block" : "d-none"}>
            <input
              ref={this.refProductNameIt}
              defaultValue={
                profile.product &&
                profile.product.name &&
                profile.product.name.it
              }
              style={{ width: 300 }}
            />
          </div>
        </div>
        <div>
          <div className="my-2">{STRINGS.photo}:</div>
          <div className="photos-panel">
            {productImages.map((image, index) => (
              <div key={index} className="photo">
                {/* <div className="d-flex justify-content-center w-100"> */}
                <img
                  className="mx-auto"
                  src={image}
                  alt=""
                  onClick={() =>
                    this.handleBrowseFile(index + 2, IMAGE_PRODUCT)
                  }
                />
                {/* </div> */}
                <button onClick={() => this.handleRemoveProductImage(index)}>
                  <i className="fa fa-close" />
                </button>
              </div>
            ))}
            {productImages.length < 3 && (
              <div
                className="photo justify-content-center align-items-center"
                onClick={() =>
                  this.handleBrowseFile(productImages.length + 2, IMAGE_PRODUCT)
                }
              >
                <i className="fa fa-upload pr-2" />
                {STRINGS.uploadPhoto}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 mb-2">{STRINGS.details}:</div>
        <div className={selectedProductLang === "en" ? "d-block" : "d-none"}>
          <TextareaAutosize
            ref={this.refProductDetail}
            defaultValue={
              profile.product &&
              profile.product.detail &&
              profile.product.detail.en
            }
            style={{ maxHeight: 400 }}
          />
        </div>
        <div className={selectedProductLang === "it" ? "d-block" : "d-none"}>
          <TextareaAutosize
            ref={this.refProductDetailIt}
            defaultValue={
              profile.product &&
              profile.product.detail &&
              profile.product.detail.it
            }
            style={{ maxHeight: 400 }}
          />
        </div>
        {btnSave}
      </div>
    );

    const contactsPanel = (
      <div
        className={`pt-4 ${tab === 2 ? "d-block" : "d-none"}`}
        ref={this.contactsPanel}
      >
        <div className="info-row">
          <span>{STRINGS.address}:</span>
          <input ref={this.refAddress} defaultValue={profile.contact.address} />
        </div>
        <div className="info-row">
          <span>{STRINGS.phone}:</span>
          <input ref={this.refPhone} defaultValue={profile.contact.phone} />
        </div>
        <div className="info-row">
          <span>{STRINGS.website}:</span>
          <input ref={this.refWebsite} defaultValue={profile.contact.website} />
        </div>
        <div className="info-row">
          <span>{STRINGS.email}:</span>
          <input ref={this.refEmail} defaultValue={profile.contact.email} />
        </div>
        <div className="info-row">
          <span>{STRINGS.secondEmail}:</span>
          <input
            ref={this.ref2ndEmail}
            defaultValue={profile.contact.email2nd}
          />
        </div>
        {btnSave}
      </div>
    );

    return (
      <div className="company-view">
        <div>
          <div className="cover-image">
            {coverImage && <img src={coverImage} alt="" />}
          </div>
          <div className="logo-image">
            {logoImage && <img src={logoImage} alt="" />}
          </div>
          <button
            className="secondary btn-change-logo"
            onClick={() => this.handleBrowseFile(1, IMAGE_LOGO)}
          >
            <i className="fa fa-upload" />
          </button>
          <button
            className="secondary btn-change-cover"
            onClick={() => this.handleBrowseFile(0, IMAGE_COVER)}
          >
            <i className="fa fa-upload pr-2" />
            {STRINGS.chooseSystemPhoto}
          </button>
        </div>
        <div className="info-panel">
          {/* <div className="tab-header">
                        {SUB_MENUS.map((menu, index) => (
                            <button key={index} className={`tab-item ${tab === index ? "active" : ""}`} onClick={() => this.handleChangeTab(index)}>
                                {menu}
                            </button>
                        ))}
                    </div> */}
          <div className="tab-body">
            {aboutUsPanel}
            {productsPanel}
            {contactsPanel}
          </div>
        </div>
        {targetToCrop && targetToCrop.info && targetToCrop.info.image && (
          <ImageCropper
            options={targetToCrop.info}
            onSave={this.handleSaveImage}
            onCancel={this.handleCropCancel}
          />
        )}
        <input
          type="file"
          onChange={this.handleChangeImage}
          className="d-none"
          ref={this.refBrowse}
          accept="image/*"
        />
        {isProcessing && <SpinnerView />}
      </div>
    );
  }
}
